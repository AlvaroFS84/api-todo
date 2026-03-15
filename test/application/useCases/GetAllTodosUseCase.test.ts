import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetAllTodosUseCase } from '../../../src/application/useCases/GetAllTodosUseCase';
import { TodoRepository } from '../../../src/domain/repositories/TodoRepository';
import { Todo } from '../../../src/domain/entities/Todo';

describe('GetAllTodosUseCase', () => {
  let mockRepository: TodoRepository;
  let getAllTodosUseCase: GetAllTodosUseCase;

  beforeEach(() => {
    mockRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    getAllTodosUseCase = new GetAllTodosUseCase(mockRepository);
  });

  it('should return all todos', async () => {
    const mockTodos: Todo[] = [
      {
        id: '1',
        title: 'Todo 1',
        description: 'Description 1',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Todo 2',
        description: 'Description 2',
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    vi.mocked(mockRepository.findAll).mockResolvedValue(mockTodos);

    const result = await getAllTodosUseCase.execute();

    expect(result).toEqual(mockTodos);
    expect(mockRepository.findAll).toHaveBeenCalled();
  });

  it('should return empty array when no todos exist', async () => {
    vi.mocked(mockRepository.findAll).mockResolvedValue([]);

    const result = await getAllTodosUseCase.execute();

    expect(result).toEqual([]);
    expect(mockRepository.findAll).toHaveBeenCalled();
  });
});
