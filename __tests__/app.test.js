import request from 'supertest';
import app from './app.js';
import { sequelize } from './models/index.js';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';

describe('Villagers API', () => {
  // Use a persistent agent to store session cookies
  const agent = request.agent(app);

  beforeAll(async () => {
    // Sync the database (force true resets tables)
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should reject access to protected routes without login', async () => {
    const res = await agent.get('/api/villagers');
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Unauthorized. Please log in.');
  });

  it('should login with valid credentials', async () => {
    const res = await agent
      .post('/api/login')
      .send({ username: 'admin', password: '123456' });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Login successful');
  });

  it('should allow access to protected routes after login', async () => {
    const res = await agent.get('/api/villagers');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new villager', async () => {
    const newVillager = { name: 'John Doe', address: '123 Main St', hobby: 'Fishing', gender: 'Male', age: 30 };
    const res = await agent.post('/api/villagers').send(newVillager);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newVillager.name);
  });

  it('should update a villager', async () => {
    // First, create a villager
    const newVillager = { name: 'Jane Doe', address: '456 Oak Ave', hobby: 'Reading', gender: 'Female', age: 25 };
    const createRes = await agent.post('/api/villagers').send(newVillager);
    expect(createRes.status).toBe(201);
    const id = createRes.body.id;

    // Update the villager
    const updatedData = { name: 'Jane Smith', address: '456 Oak Ave', hobby: 'Reading', gender: 'Female', age: 26 };
    const updateRes = await agent.put(`/api/villagers/${id}`).send(updatedData);
    expect(updateRes.status).toBe(200);
    expect(updateRes.body.name).toBe(updatedData.name);
    expect(updateRes.body.age).toBe(updatedData.age);
  });

  it('should delete a villager', async () => {
    // Create a villager to delete
    const newVillager = { name: 'Mark Spencer', address: '789 Pine Rd', hobby: 'Gardening', gender: 'Male', age: 40 };
    const createRes = await agent.post('/api/villagers').send(newVillager);
    const id = createRes.body.id;

    // Delete the villager
    const deleteRes = await agent.delete(`/api/villagers/${id}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.message).toBe('Villager deleted successfully');
  });

  it('should logout successfully', async () => {
    const res = await agent.post('/api/logout');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Logout successful');
  });
});
