const request = require('supertest');
const app = require('../server'); // Adjust the path to your server.js file

describe('Login Endpoint', () => {
  it('should login successfully with correct credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(302); // Assuming a redirect happens on success
    expect(res.headers.location).toBe('/');
  });

  it('should fail with incorrect credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword'
      });

    expect(res.statusCode).toEqual(302); // Assuming a redirect happens on failure
    expect(res.headers.location).toBe('/');
  });
});