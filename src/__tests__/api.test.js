const request = require('supertest');
const app = require('../app');

describe('GET /api/generate', () => {
    it('should return 400 if url is missing', async () => {
        const response = await request(app).get('/api/generate');
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    it('should return 200 and QR codes if url is provided', async () => {
        const response = await request(app).get('/api/generate?url=https://google.com');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('png');
        expect(response.body).toHaveProperty('svg');
        expect(response.body.png).toContain('data:image/png;base64');
    });
});
