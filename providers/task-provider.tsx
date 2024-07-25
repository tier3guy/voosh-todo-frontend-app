"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "@/axios.config";
import { ITodo } from "@/interfaces";
import { toast } from "sonner";

interface TaskContextProps {
    tasks: ITodo[];
    loading: boolean;
    error: string;
    fetchTasks: () => Promise<void>;
    addTask: (
        title: string,
        description: string,
        setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    ) => Promise<void>;
    updateTask: (
        task: ITodo,
        setDialogOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined
    ) => Promise<void>;
    updateAllTask: (
        tasks: ITodo[],
        setDialogOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined
    ) => Promise<void>;
    deleteTask: (
        task: ITodo,
        setDialogOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined
    ) => Promise<void>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
};

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<ITodo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchTasks = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get("/api/todo/all");
            if (response.status === 200) {
                setTasks(response.data);
            }
        } catch (error: any) {
            setError(error?.response?.data || "Error fetching tasks");
            toast(error?.response?.data || "Error fetching tasks");
        } finally {
            setLoading(false);
        }
    };

    const updateTask = async (
        task: ITodo,
        setDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setLoading(true);
        try {
            const response = await axios.put(`/api/todo/${task._id}`, task);
            if (response.status === 200) {
                setTasks(response.data);
                if (setDialogOpen) setDialogOpen(false);
                toast.success("Task updated successfully");
            }
        } catch (error) {
            toast.error("Error while updating, please try again later");
        } finally {
            setLoading(false);
        }
    };

    const updateAllTask = async (
        tasks: ITodo[],
        setDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setLoading(true);
        try {
            const response = await axios.put("/api/todo/all", { tasks });
            if (response.status === 200) {
                setTasks(response.data);
                if (setDialogOpen) setDialogOpen(false);
                toast.success("Tasks updated successfully");
            }
        } catch (error) {
            toast.error("Error while updating, please try again later");
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (
        title: string,
        description: string,
        setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setLoading(true);
        try {
            const response = await axios.post("/api/todo/create", {
                title,
                description,
            });
            if (response.status === 201) {
                setTasks(response.data);
                toast.success("Task added successfully");
            } else {
                setError(response.data);
                toast.error(response.data);
            }
        } catch (error: any) {
            setError(error?.response?.data || "Error adding task");
            toast.error(error?.response?.data || "Error adding task");
        } finally {
            setLoading(false);
            setDialogOpen(false);
        }
    };

    const deleteTask = async (
        task: ITodo,
        setDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setLoading(true);
        try {
            const response = await axios.delete(`/api/todo/${task._id}`);
            if (response.status === 200) {
                setTasks(response.data);
                if (setDialogOpen) setDialogOpen(false);
                toast.success("Task deleted successfully");
            }
        } catch (error) {
            toast.error("Error while deleting, please try again later");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider
            value={{
                tasks,
                loading,
                error,
                fetchTasks,
                addTask,
                updateTask,
                updateAllTask,
                deleteTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
