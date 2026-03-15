import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import request from 'supertest';
import app from '../../../src/main';
import { closeDatabase } from '../../../src/infrastructure/database';

describe('Todos API Integration Tests', () => {
  afterAll(() => {
    closeDatabase();
  });

  describe('GET /todos', () => {
    it('should return empty array initially', async () => {
      const response = await request(app).get('/todos');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /todos', () => {
    it('should create a new todo', async () => {
      const response = await request(app)
        .post('/todos')
        .send({ title: 'Test Todo', description: 'Test Description' });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Test Todo');
      expect(response.body.description).toBe('Test Description');
      expect(response.body.completed).toBe(false);
    });

    it('should return 400 when title is empty', async () => {
      const response = await request(app)
        .post('/todos')
        .send({ title: '', description: 'Test Description' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Title is required');
    });

    it('should return 400 when title is not provided', async () => {
      const response = await request(app)
        .post('/todos')
        .send({ description: 'Test Description' });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /todos/:id', () => {
    let todoId: string;

    beforeAll(async () => {
      const response = await request(app)
        .post('/todos')
        .send({ title: 'Test Todo', description: 'Test Description' });
      todoId = response.body.id;
    });

    it('should return todo by id', async () => {
      const response = await request(app).get(`/todos/${todoId}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(todoId);
    });

    it('should return 404 for nonexistent id', async () => {
      const response = await request(app).get('/todos/nonexistent');
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /todos/:id', () => {
    let todoId: string;

    beforeAll(async () => {
      const response = await request(app)
        .post('/todos')
        .send({ title: 'Original Title', description: 'Original Description' });
      todoId = response.body.id;
    });

    it('should update a todo', async () => {
      const response = await request(app)
        .put(`/todos/${todoId}`)
        .send({ title: 'Updated Title', completed: true });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Updated Title');
      expect(response.body.completed).toBe(true);
    });

    it('should return 404 for nonexistent id', async () => {
      const response = await request(app)
        .put('/todos/nonexistent')
        .send({ title: 'Updated Title' });

      expect(response.status).toBe(404);
    });

    it('should return 400 when title is empty', async () => {
      const response = await request(app)
        .put(`/todos/${todoId}`)
        .send({ title: '' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Title cannot be empty');
    });
  });

  describe('DELETE /todos/:id', () => {
    let todoId: string;

    beforeAll(async () => {
      const response = await request(app)
        .post('/todos')
        .send({ title: 'To Delete', description: 'Test' });
      todoId = response.body.id;
    });

    it('should delete a todo', async () => {
      const response = await request(app).delete(`/todos/${todoId}`);
      expect(response.status).toBe(204);

      const getResponse = await request(app).get(`/todos/${todoId}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 for nonexistent id', async () => {
      const response = await request(app).delete('/todos/nonexistent');
      expect(response.status).toBe(404);
    });
  });
});
