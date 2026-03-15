import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UpdateTodoUseCase } from '../../../src/application/useCases/UpdateTodoUseCase';
import { TodoRepository } from '../../../src/domain/repositories/TodoRepository';
import { Todo } from '../../../src/domain/entities/Todo';

describe('UpdateTodoUseCase', () => {
  let mockRepository: TodoRepository;
  let updateTodoUseCase: UpdateTodoUseCase;

  const mockTodo: Todo = {
    id: '1',
    title: 'Original Title',
    description: 'Original Description',
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
    updateTodoUseCase = new UpdateTodoUseCase(mockRepository);
  });

  it('should update todo successfully', async () => {
    const updatedTodo: Todo = {
      ...mockTodo,
      title: 'Updated Title',
      description: 'Updated Description',
      completed: true,
      updatedAt: new Date(),
    };

    vi.mocked(mockRepository.findById).mockResolvedValue(mockTodo);
    vi.mocked(mockRepository.update).mockResolvedValue(updatedTodo);

    const result = await updateTodoUseCase.execute('1', {
      title: 'Updated Title',
      description: 'Updated Description',
      completed: true,
    });

    expect(result?.title).toBe('Updated Title');
    expect(result?.description).toBe('Updated Description');
    expect(result?.completed).toBe(true);
    expect(mockRepository.update).toHaveBeenCalled();
  });

  it('should return null when todo does not exist', async () => {
    vi.mocked(mockRepository.findById).mockResolvedValue(null);

    const result = await updateTodoUseCase.execute('nonexistent', {
      title: 'Updated Title',
    });

    expect(result).toBeNull();
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it('should throw error when title is empty', async () => {
    vi.mocked(mockRepository.findById).mockResolvedValue(mockTodo);

    await expect(
      updateTodoUseCase.execute('1', {
        title: '',
      })
    ).rejects.toThrow('Title cannot be empty');
  });

  it('should throw error when title is only spaces', async () => {
    vi.mocked(mockRepository.findById).mockResolvedValue(mockTodo);

    await expect(
      updateTodoUseCase.execute('1', {
        title: '   ',
      })
    ).rejects.toThrow('Title cannot be empty');
  });

  it('should update only provided fields', async () => {
    const updatedTodo: Todo = {
      ...mockTodo,
      title: 'New Title',
      updatedAt: new Date(),
    };

    vi.mocked(mockRepository.findById).mockResolvedValue(mockTodo);
    vi.mocked(mockRepository.update).mockResolvedValue(updatedTodo);

    const result = await updateTodoUseCase.execute('1', {
      title: 'New Title',
    });

    expect(result?.title).toBe('New Title');
    expect(result?.description).toBe('Original Description');
    expect(result?.completed).toBe(false);
  });
});
