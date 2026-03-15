export interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateTodoProps {
    title: string;
    description: string;
}
export interface UpdateTodoProps {
    title?: string;
    description?: string;
    completed?: boolean;
}
//# sourceMappingURL=Todo.d.ts.map