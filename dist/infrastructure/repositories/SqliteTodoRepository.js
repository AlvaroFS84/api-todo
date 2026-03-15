"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqliteTodoRepository = void 0;
const database_1 = require("../database");
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
class SqliteTodoRepository {
    async findAll() {
        const db = (0, database_1.getDatabase)();
        const rows = db.prepare('SELECT * FROM todos ORDER BY created_at DESC').all();
        return rows.map(this.mapRowToTodo);
    }
    async findById(id) {
        const db = (0, database_1.getDatabase)();
        const row = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
        return row ? this.mapRowToTodo(row) : null;
    }
    async create(props) {
        const db = (0, database_1.getDatabase)();
        const now = new Date().toISOString();
        const id = generateId();
        const todo = {
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
    async update(id, props) {
        const existing = await this.findById(id);
        if (!existing) {
            return null;
        }
        const db = (0, database_1.getDatabase)();
        const now = new Date().toISOString();
        const updatedTodo = {
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
    async delete(id) {
        const db = (0, database_1.getDatabase)();
        const result = db.prepare('DELETE FROM todos WHERE id = ?').run(id);
        return result.changes > 0;
    }
    mapRowToTodo(row) {
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
exports.SqliteTodoRepository = SqliteTodoRepository;
//# sourceMappingURL=SqliteTodoRepository.js.map