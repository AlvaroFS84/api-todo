import { TodoRepository } from '../../domain/repositories/TodoRepository';
import { Todo } from '../../domain/entities/Todo';
export declare class GetTodoByIdUseCase {
    private readonly todoRepository;
    constructor(todoRepository: TodoRepository);
    execute(id: string): Promise<Todo | null>;
}
//# sourceMappingURL=GetTodoByIdUseCase.d.ts.map