import { TodoRepository } from '../../domain/repositories/TodoRepository';
export declare class DeleteTodoUseCase {
    private readonly todoRepository;
    constructor(todoRepository: TodoRepository);
    execute(id: string): Promise<boolean>;
}
//# sourceMappingURL=DeleteTodoUseCase.d.ts.map