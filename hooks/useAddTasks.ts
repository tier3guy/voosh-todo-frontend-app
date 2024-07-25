"use client";

import axios from "@/axios.config";
import { useState } from "react";
import { toast } from "sonner";

const useAddTask = (): {
    loading: boolean;
    error: string;
    handleAddTask: (title: string, description: string) => void;
} => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleAddTask = async (title: string, description: string) => {
        try {
            setError("");
            setLoading(true);

            const res = await axios.post("/api/todo/create", {
                title,
                description,
            });
            if (res.status === 200) {
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
        }
    };

    return { loading, error, handleAddTask };
};

export default useAddTask;
