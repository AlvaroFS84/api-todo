import { TodoRepository } from '../../domain/repositories/TodoRepository';
import { Todo } from '../../domain/entities/Todo';
export declare class GetAllTodosUseCase {
    private readonly todoRepository;
    constructor(todoRepository: TodoRepository);
    execute(): Promise<Todo[]>;
}
//# sourceMappingURL=GetAllTodosUseCase.d.ts.map