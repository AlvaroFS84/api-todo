export interface CreateTodoDTO {
    title: string;
    description: string;
}
export interface UpdateTodoDTO {
    title?: string;
    description?: string;
    completed?: boolean;
}
export interface TodoResponseDTO {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}
//# sourceMappingURL=TodoDTO.d.ts.map