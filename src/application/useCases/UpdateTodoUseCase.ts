import { TodoRepository } from '../../domain/repositories/TodoRepository';
import { Todo, UpdateTodoProps } from '../../domain/entities/Todo';

export class UpdateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(id: string, props: UpdateTodoProps): Promise<Todo | null> {
    const existingTodo = await this.todoRepository.findById(id);
    if (!existingTodo) {
      return null;
    }

    const updatedProps: UpdateTodoProps = {};
    if (props.title !== undefined) {
      if (props.title.trim().length === 0) {
        throw new Error('Title cannot be empty');
      }
      updatedProps.title = props.title.trim();
    }
    if (props.description !== undefined) {
      updatedProps.description = props.description.trim();
    }
    if (props.completed !== undefined) {
      updatedProps.completed = props.completed;
    }

    return this.todoRepository.update(id, updatedProps);
  }
}
