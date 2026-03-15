import { TodoRepository } from '../../domain/repositories/TodoRepository';
import { Todo } from '../../domain/entities/Todo';

export class GetTodoByIdUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(id: string): Promise<Todo | null> {
    return this.todoRepository.findById(id);
  }
}
