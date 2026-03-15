import { Todo, CreateTodoProps, UpdateTodoProps } from '../../domain/entities/Todo';
import { TodoRepository } from '../../domain/repositories/TodoRepository';
export declare class SqliteTodoRepository implements TodoRepository {
    findAll(): Promise<Todo[]>;
    findById(id: string): Promise<Todo | null>;
    create(props: CreateTodoProps): Promise<Todo>;
    update(id: string, props: UpdateTodoProps): Promise<Todo | null>;
    delete(id: string): Promise<boolean>;
    private mapRowToTodo;
}
//# sourceMappingURL=SqliteTodoRepository.d.ts.map