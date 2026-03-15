import { TodoRepository } from '../../domain/repositories/TodoRepository';

export class DeleteTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(id: string): Promise<boolean> {
    const existingTodo = await this.todoRepository.findById(id);
    if (!existingTodo) {
      return false;
    }
    return this.todoRepository.delete(id);
  }
}
