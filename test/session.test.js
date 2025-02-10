import request from 'supertest';
import {app, server} from '../index.js';

describe('Session Authentication Tests', () => {
    let agent = request.agent(app);
  
    test('Should login and create session', async () => {
      const res = await agent.post('/login').send({ username: 'user1', password: 'password1' });
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Login successful');
    });
  
    test('Should access protected route with session', async () => {
      const res = await agent.get('/dashboard');
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/Welcome/);
    });
  
    test('Should logout and destroy session', async () => {
      await agent.post('/logout');
      const res = await agent.get('/dashboard');
      expect(res.status).toBe(401);
    });
  });

  afterAll(() => {
    server.close();
  });
  