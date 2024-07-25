"use client";
import axios from "@/axios.config";
import { ITodo } from "@/interfaces";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useFetchTask = (): {
    tasks: ITodo[];
    loading: boolean;
    error: string;
    updateTask: (task: ITodo) => Promise<void>;
} => {
    const [tasks, setTasks] = useState<ITodo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const updateTask = async (task: ITodo) => {
        try {
            const { _id, title, description, completed, status } = task;
            const response = await axios.put(`/api/todo/${_id}`, {
                title,
                description,
                completed,
                status,
            });
            if (response.status === 200) {
                toast.success("Task updated successfully");
            }
        } catch (error) {
            toast("Error while updating, please try again later");
        }
    };

    useEffect(() => {
        async function fetchTasks() {
            try {
                setLoading(true);
                setError("");

                const response = await axios.get("/api/todo/all");

                if (response.status === 200) {
                    setTasks(response.data);
                }
            } catch (error: any) {
                console.log(error);
                setError(error?.response?.data);
            } finally {
                setLoading(false);
            }
        }
        fetchTasks();
    }, []);

    return { tasks, loading, error, updateTask };
};

export default useFetchTask;
