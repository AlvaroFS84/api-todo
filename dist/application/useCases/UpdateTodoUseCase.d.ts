import { TodoRepository } from '../../domain/repositories/TodoRepository';
import { Todo, UpdateTodoProps } from '../../domain/entities/Todo';
export declare class UpdateTodoUseCase {
    private readonly todoRepository;
    constructor(todoRepository: TodoRepository);
    execute(id: string, props: UpdateTodoProps): Promise<Todo | null>;
}
//# sourceMappingURL=UpdateTodoUseCase.d.ts.map