import { Todo, CreateTodoProps, UpdateTodoProps } from '../entities/Todo';
export interface TodoRepository {
    findAll(): Promise<Todo[]>;
    findById(id: string): Promise<Todo | null>;
    create(props: CreateTodoProps): Promise<Todo>;
    update(id: string, props: UpdateTodoProps): Promise<Todo | null>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=TodoRepository.d.ts.map