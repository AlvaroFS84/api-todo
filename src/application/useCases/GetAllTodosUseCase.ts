import { TodoRepository } from '../../domain/repositories/TodoRepository';
import { Todo } from '../../domain/entities/Todo';

export class GetAllTodosUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }
}
