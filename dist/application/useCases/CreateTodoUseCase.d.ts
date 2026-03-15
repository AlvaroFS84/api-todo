import { TodoRepository } from '../../domain/repositories/TodoRepository';
import { Todo, CreateTodoProps } from '../../domain/entities/Todo';
export declare class CreateTodoUseCase {
    private readonly todoRepository;
    constructor(todoRepository: TodoRepository);
    execute(props: CreateTodoProps): Promise<Todo>;
}
//# sourceMappingURL=CreateTodoUseCase.d.ts.map