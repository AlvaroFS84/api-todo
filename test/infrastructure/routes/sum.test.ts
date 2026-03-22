import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../../src/main';

describe('GET /sum', () => {
  it('should return the sum of two numbers', async () => {
    const res = await request(app).get('/sum?a=3&b=5');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ a: 3, b: 5, result: 8 });
  });

  it('should handle negative numbers', async () => {
    const res = await request(app).get('/sum?a=-10&b=4');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ a: -10, b: 4, result: -6 });
  });

  it('should handle decimal numbers', async () => {
    const res = await request(app).get('/sum?a=1.5&b=2.5');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ a: 1.5, b: 2.5, result: 4 });
  });

  it('should return 400 when a is not a number', async () => {
    const res = await request(app).get('/sum?a=abc&b=5');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 when b is not a number', async () => {
    const res = await request(app).get('/sum?a=3&b=xyz');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 when query params are missing', async () => {
    const res = await request(app).get('/sum?a=3');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
