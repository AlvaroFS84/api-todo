import { Todo, CreateTodoProps, UpdateTodoProps } from '../../domain/entities/Todo';
import { TodoRepository } from '../../domain/repositories/TodoRepository';
import { getDatabase } from '../database';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export class SqliteTodoRepository implements TodoRepository {
  async findAll(): Promise<Todo[]> {
    const db = getDatabase();
    const rows = db.prepare('SELECT * FROM todos ORDER BY created_at DESC').all() as any[];
    return rows.map(this.mapRowToTodo);
  }

  async findById(id: string): Promise<Todo | null> {
    const db = getDatabase();
    const row = db.prepare('SELECT * FROM todos WHERE id = ?').get(id) as any;
    return row ? this.mapRowToTodo(row) : null;
  }

  async create(props: CreateTodoProps): Promise<Todo> {
    const db = getDatabase();
    const now = new Date().toISOString();
    const id = generateId();

    const todo: Todo = {
      id,
      title: props.title,
      description: props.description,
      completed: false,
      createdAt: new Date(now),
      updatedAt: new Date(now),
    };

    db.prepare(`
      INSERT INTO todos (id, title, description, completed, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(todo.id, todo.title, todo.description, todo.completed ? 1 : 0, now, now);

    return todo;
  }

  async update(id: string, props: UpdateTodoProps): Promise<Todo | null> {
    const existing = await this.findById(id);
    if (!existing) {
      return null;
    }

    const db = getDatabase();
    const now = new Date().toISOString();

    const updatedTodo: Todo = {
      ...existing,
      title: props.title ?? existing.title,
      description: props.description ?? existing.description,
      completed: props.completed ?? existing.completed,
      updatedAt: new Date(now),
    };

    db.prepare(`
      UPDATE todos
      SET title = ?, description = ?, completed = ?, updated_at = ?
      WHERE id = ?
    `).run(updatedTodo.title, updatedTodo.description, updatedTodo.completed ? 1 : 0, now, id);

    return updatedTodo;
  }

  async delete(id: string): Promise<boolean> {
    const db = getDatabase();
    const result = db.prepare('DELETE FROM todos WHERE id = ?').run(id);
    return result.changes > 0;
  }

  private mapRowToTodo(row: any): Todo {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      completed: row.completed === 1,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}
