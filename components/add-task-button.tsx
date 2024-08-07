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
import { useState } from "react";

export default function AddTaskButton() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState("");
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const { loading, addTask } = useTasks();

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger className="cursor-pointer bg-blue-500 text-white hover:bg-blue-500/90 text-sm h-[40px] grid place-content-center px-6 rounded-md">
                <p>Add Task</p>
            </DialogTrigger>
            <DialogContent className="w-[700px]">
                <DialogHeader>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogDescription>
                        Add your task here, set the priority and put the
                        description.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-2">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            className="col-span-3"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="h-[200px]"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="text-sm rounded-md py-3 bg-blue-600 font-medium text-white"
                    disabled={loading}
                    onClick={() => {
                        addTask(title, description, setDialogOpen);
                    }}
                >
                    {loading ? "Saving..." : "Save Task"}
                </button>
            </DialogContent>
        </Dialog>
    );
}
