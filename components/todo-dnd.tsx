"use client";

import useTask from "@/hooks/useTasks";
import { ITodo, ITodoStatus } from "@/interfaces";
import { useEffect, useState } from "react";
import {
    DragDropContext,
    DropResult,
    Droppable,
    Draggable,
} from "react-beautiful-dnd";
import ExpandButton from "./expand-button";

export default function TodoDND() {
    const { tasks, updateTask } = useTask();
    const [todo, setTodo] = useState(tasks);
    const [inProgress, setInProgress] = useState(tasks);
    const [completed, setCompleted] = useState(tasks);

    const onDragEnd = async (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId) {
            return;
        }

        const sourceList = getListById(source.droppableId);
        const destinationList = getListById(destination.droppableId);
        const [movedTask] = sourceList.splice(source.index, 1);

        movedTask.status = destination.droppableId as ITodoStatus;
        destinationList.splice(destination.index, 0, movedTask);

        setStateById(source.droppableId, sourceList);
        setStateById(destination.droppableId, destinationList);

        await updateTask(movedTask, undefined);
    };

    const getListById = (id: string): ITodo[] => {
        if (id === "NOT_STARTED") return [...todo];
        if (id === "IN_PROGRESS") return [...inProgress];
        if (id === "COMPLETED") return [...completed];
        return [];
    };

    const setStateById = (id: string, list: ITodo[]) => {
        if (id === "NOT_STARTED") setTodo(list);
        if (id === "IN_PROGRESS") setInProgress(list);
        if (id === "COMPLETED") setCompleted(list);
    };

    useEffect(() => {
        setTodo(() => {
            return tasks.filter((task: ITodo) => task.status === "NOT_STARTED");
        });
        setInProgress(() => {
            return tasks.filter((task: ITodo) => task.status === "IN_PROGRESS");
        });
        setCompleted(() => {
            return tasks.filter((task: ITodo) => task.status === "COMPLETED");
        });
    }, [tasks]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="h-full overflow-hidden flex divide-x-2">
                <DNDSection label={"NOT_STARTED"} data={todo} />
                <DNDSection label={"IN_PROGRESS"} data={inProgress} />
                <DNDSection label={"COMPLETED"} data={completed} />
            </div>
        </DragDropContext>
    );
}

export function DNDSection({
    label,
    data,
}: {
    label: ITodoStatus;
    data: ITodo[];
}) {
    const header =
        label === "NOT_STARTED"
            ? "TODO"
            : label === "IN_PROGRESS"
            ? "IN PROGRESS"
            : "DONE";

    return (
        <div className="flex-1 h-full flex flex-col overflow-hidden">
            <div className="border-b-2 bg-white overflow-hidden py-2 text-center font-bold">
                <p>{header}</p>
            </div>
            <Droppable droppableId={label}>
                {(provided) => (
                    <div
                        className="flex-1 h-full overflow-x-hidden overflow-y-auto flex flex-col gap-4 p-4"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {data.map((task: ITodo, index: number) => (
                            <DNDCard key={task._id} data={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export function DNDCard({ data, index }: { data: ITodo; index: number }) {
    return (
        <Draggable draggableId={data._id} index={index}>
            {(provided) => (
                <div
                    className="rounded-md bg-slate-50 border-2 py-4 px-6 z-10"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <h3 className="font-semibold text-foreground">
                        {data.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 text-sm mt-2">
                        {data.description}
                    </p>
                    <div className="mt-4 flex items-start gap-5">
                        <ExpandButton task={data} />
                    </div>
                </div>
            )}
        </Draggable>
    );
}
