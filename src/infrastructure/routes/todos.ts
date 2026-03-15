import { Router, Request, Response } from 'express';
import {
  GetAllTodosUseCase,
  GetTodoByIdUseCase,
  CreateTodoUseCase,
  UpdateTodoUseCase,
  DeleteTodoUseCase,
} from '../../application/useCases';
import { SqliteTodoRepository } from '../repositories/SqliteTodoRepository';
import { CreateTodoDTO, UpdateTodoDTO, TodoResponseDTO } from '../../application/dtos/TodoDTO';

const router = Router();
const repository = new SqliteTodoRepository();

function toResponseDTO(todo: any): TodoResponseDTO {
  return {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
    createdAt: todo.createdAt.toISOString(),
    updatedAt: todo.updatedAt.toISOString(),
  };
}

router.get('/todos', async (_req: Request, res: Response) => {
  try {
    const useCase = new GetAllTodosUseCase(repository);
    const todos = await useCase.execute();
    res.json(todos.map(toResponseDTO));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/todos/:id', async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const useCase = new GetTodoByIdUseCase(repository);
    const todo = await useCase.execute(id);
    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    res.json(toResponseDTO(todo));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/todos', async (req: Request, res: Response) => {
  try {
    const dto: CreateTodoDTO = req.body;
    const useCase = new CreateTodoUseCase(repository);
    const todo = await useCase.execute(dto);
    res.status(201).json(toResponseDTO(todo));
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/todos/:id', async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const dto: UpdateTodoDTO = req.body;
    const useCase = new UpdateTodoUseCase(repository);
    const todo = await useCase.execute(id, dto);
    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    res.json(toResponseDTO(todo));
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/todos/:id', async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const useCase = new DeleteTodoUseCase(repository);
    const deleted = await useCase.execute(id);
    if (!deleted) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
