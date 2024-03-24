const request = require('supertest');
const app = require('../server'); // Adjust the path to your server.js file

describe('Logout Endpoint', () => {
  it('should logout the user', async () => {
    const res = await request(app).get('/logout');

    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toBe('/');
  });
});
