import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateTodoUseCase } from '../../../src/application/useCases/CreateTodoUseCase';
import { TodoRepository } from '../../../src/domain/repositories/TodoRepository';
import { Todo } from '../../../src/domain/entities/Todo';

describe('CreateTodoUseCase', () => {
  let mockRepository: TodoRepository;
  let createTodoUseCase: CreateTodoUseCase;

  beforeEach(() => {
    mockRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    createTodoUseCase = new CreateTodoUseCase(mockRepository);
  });

  it('should create a todo successfully', async () => {
    const mockTodo: Todo = {
      id: '1',
      title: 'Test Todo',
      description: 'Test Description',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(mockRepository.create).mockResolvedValue(mockTodo);

    const result = await createTodoUseCase.execute({
      title: 'Test Todo',
      description: 'Test Description',
    });

    expect(result).toEqual(mockTodo);
    expect(mockRepository.create).toHaveBeenCalledWith({
      title: 'Test Todo',
      description: 'Test Description',
    });
  });

  it('should trim title and description', async () => {
    const mockTodo: Todo = {
      id: '1',
      title: 'Test Todo',
      description: 'Test Description',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(mockRepository.create).mockResolvedValue(mockTodo);

    await createTodoUseCase.execute({
      title: '  Test Todo  ',
      description: '  Test Description  ',
    });

    expect(mockRepository.create).toHaveBeenCalledWith({
      title: 'Test Todo',
      description: 'Test Description',
    });
  });

  it('should throw error when title is empty', async () => {
    await expect(
      createTodoUseCase.execute({
        title: '',
        description: 'Test Description',
      })
    ).rejects.toThrow('Title is required');
  });

  it('should throw error when title is only spaces', async () => {
    await expect(
      createTodoUseCase.execute({
        title: '   ',
        description: 'Test Description',
      })
    ).rejects.toThrow('Title is required');
  });

  it('should throw error when title is not provided', async () => {
    await expect(
      createTodoUseCase.execute({
        title: undefined as any,
        description: 'Test Description',
      })
    ).rejects.toThrow('Title is required');
  });

  it('should handle empty description', async () => {
    const mockTodo: Todo = {
      id: '1',
      title: 'Test Todo',
      description: '',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(mockRepository.create).mockResolvedValue(mockTodo);

    const result = await createTodoUseCase.execute({
      title: 'Test Todo',
    });

    expect(mockRepository.create).toHaveBeenCalledWith({
      title: 'Test Todo',
      description: '',
    });
  });
});
