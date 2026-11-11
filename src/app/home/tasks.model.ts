export interface Task {
    _id?: string;
    title: string;
    description: string;
    isDone: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface TaskDTO {
    title?: string;
    description?: string;
    isDone?: boolean;
}