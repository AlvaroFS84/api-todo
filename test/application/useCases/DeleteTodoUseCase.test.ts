import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DeleteTodoUseCase } from '../../../src/application/useCases/DeleteTodoUseCase';
import { TodoRepository } from '../../../src/domain/repositories/TodoRepository';
import { Todo } from '../../../src/domain/entities/Todo';

describe('DeleteTodoUseCase', () => {
  let mockRepository: TodoRepository;
  let deleteTodoUseCase: DeleteTodoUseCase;

  const mockTodo: Todo = {
    id: '1',
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    deleteTodoUseCase = new DeleteTodoUseCase(mockRepository);
  });

  it('should delete todo successfully', async () => {
    vi.mocked(mockRepository.findById).mockResolvedValue(mockTodo);
    vi.mocked(mockRepository.delete).mockResolvedValue(true);

    const result = await deleteTodoUseCase.execute('1');

    expect(result).toBe(true);
    expect(mockRepository.findById).toHaveBeenCalledWith('1');
    expect(mockRepository.delete).toHaveBeenCalledWith('1');
  });

  it('should return false when todo does not exist', async () => {
    vi.mocked(mockRepository.findById).mockResolvedValue(null);

    const result = await deleteTodoUseCase.execute('nonexistent');

    expect(result).toBe(false);
    expect(mockRepository.delete).not.toHaveBeenCalled();
  });
});
