"use client";
import axios from "@/axios.config";
import { ITodo } from "@/interfaces";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useFetchTask = (): {
    tasks: ITodo[];
    loading: boolean;
    error: string;
    updateTask: (
        task: ITodo,
        setDialogOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined
    ) => Promise<void>;
    deleteTask: (
        task: ITodo,
        setDialogOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined
    ) => Promise<void>;
    addTask: (
        title: string,
        description: string,
        setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    ) => Promise<void>;
    fetchTasks: () => Promise<void>;
} => {
    const [tasks, setTasks] = useState<ITodo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchTasks = async () => {
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
    };

    const updateTask = async (
        task: ITodo,
        setDialogOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined
    ) => {
        try {
            setLoading(true);
            const { _id, title, description, completed, status } = task;
            const response = await axios.put(`/api/todo/${_id}`, {
                title,
                description,
                completed,
                status,
            });

            if (response.status === 200) {
                if (setDialogOpen) {
                    setDialogOpen(false);
                }
                toast.success("Task updated successfully");
            }
        } catch (error) {
            toast("Error while updating, please try again later");
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (
        title: string,
        description: string,
        setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        try {
            setError("");
            setLoading(true);

            const res = await axios.post("/api/todo/create", {
                title,
                description,
            });

            if (res.status === 201) {
                await fetchTasks();
                toast("Task added successfully.");
            } else {
                setError(res.data);
            }
        } catch (error: any) {
            console.log(error);
            setError(error?.response?.data);
            toast(error?.response?.data);
        } finally {
            setLoading(false);
            setDialogOpen(false);
        }
    };

    const deleteTask = async (
        task: ITodo,
        setDialogOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined
    ) => {
        try {
            setLoading(true);
            const { _id } = task;
            const response = await axios.delete(`/api/todo/${_id}`);

            if (response.status === 200) {
                if (setDialogOpen) {
                    setDialogOpen(false);
                }
                toast.success("Task deleted successfully");
            }
        } catch (error) {
            toast("Error while updating, please try again later");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return {
        tasks,
        loading,
        error,
        updateTask,
        fetchTasks,
        addTask,
        deleteTask,
    };
};

export default useFetchTask;
