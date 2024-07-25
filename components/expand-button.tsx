"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTasks } from "@/providers/task-provider";
import { ITodo } from "@/interfaces";
import { useState } from "react";

export default function ExpandButton({ task }: { task: ITodo }) {
    const [todo, setTodo] = useState<ITodo>(task);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const { updateTask, loading, deleteTask } = useTasks();

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger className="cursor-pointer">
                <p className="text-sm font-medium py-[6px] px-6 rounded-full bg-gray-200">
                    Expand
                </p>
            </DialogTrigger>
            <DialogContent className="w-[700px]">
                <DialogHeader>
                    <DialogTitle>Task</DialogTitle>
                    <DialogDescription>
                        Update the task here, set the priority and update the
                        description.
                    </DialogDescription>
                    <p className="text-xs bg-gray-100 py-[5px] px-4 rounded-full w-fit">
                        ID: {task._id}
                    </p>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-2">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={todo.title}
                            className="col-span-3"
                            onChange={(e) => {
                                setTodo((prev) => {
                                    return {
                                        ...prev,
                                        title: e.target.value,
                                    };
                                });
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={todo.description}
                            onChange={(e) => {
                                setTodo((prev) => {
                                    return {
                                        ...prev,
                                        description: e.target.value,
                                    };
                                });
                            }}
                            className="h-[200px]"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="submit"
                        className="flex-1 text-sm rounded-md py-3 bg-red-500 font-medium text-white"
                        disabled={loading}
                        onClick={() => {
                            deleteTask(todo, setDialogOpen);
                        }}
                    >
                        {"Delete Task"}
                    </button>
                    <button
                        type="submit"
                        className="flex-1 text-sm rounded-md py-3 bg-blue-600 font-medium text-white"
                        disabled={loading}
                        onClick={() => {
                            updateTask(todo, setDialogOpen);
                        }}
                    >
                        {"Update Task"}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
