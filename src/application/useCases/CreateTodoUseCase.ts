import { TodoRepository } from '../../domain/repositories/TodoRepository';
import { Todo, CreateTodoProps } from '../../domain/entities/Todo';

export class CreateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(props: CreateTodoProps): Promise<Todo> {
    if (!props.title || props.title.trim().length === 0) {
      throw new Error('Title is required');
    }
    return this.todoRepository.create({
      title: props.title.trim(),
      description: props.description?.trim() || '',
    });
  }
}
