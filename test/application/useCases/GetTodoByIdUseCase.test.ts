import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetTodoByIdUseCase } from '../../../src/application/useCases/GetTodoByIdUseCase';
import { TodoRepository } from '../../../src/domain/repositories/TodoRepository';
import { Todo } from '../../../src/domain/entities/Todo';

describe('GetTodoByIdUseCase', () => {
  let mockRepository: TodoRepository;
  let getTodoByIdUseCase: GetTodoByIdUseCase;

  beforeEach(() => {
    mockRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    getTodoByIdUseCase = new GetTodoByIdUseCase(mockRepository);
  });

  it('should return todo when it exists', async () => {
    const mockTodo: Todo = {
      id: '1',
      title: 'Test Todo',
      description: 'Test Description',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(mockRepository.findById).mockResolvedValue(mockTodo);

    const result = await getTodoByIdUseCase.execute('1');

    expect(result).toEqual(mockTodo);
    expect(mockRepository.findById).toHaveBeenCalledWith('1');
  });

  it('should return null when todo does not exist', async () => {
    vi.mocked(mockRepository.findById).mockResolvedValue(null);

    const result = await getTodoByIdUseCase.execute('nonexistent');

    expect(result).toBeNull();
    expect(mockRepository.findById).toHaveBeenCalledWith('nonexistent');
  });
});
