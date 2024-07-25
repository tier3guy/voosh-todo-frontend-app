export interface IUser {
    fname: string;
    lname: string;
    email: string;
    password: string;
    _id: string;
}

export type ITodoStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export interface ITodo {
    title: string;
    description: string;
    completed: boolean;
    status: ITodoStatus;
    owner: IUser["_id"]; // Reference to User model
    createdAt: Date;
    updatedAt: Date;
    _id: string;
}

export interface IJwtPayload {
    id: string;
}
