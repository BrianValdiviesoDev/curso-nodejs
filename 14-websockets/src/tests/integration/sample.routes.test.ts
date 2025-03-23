import request from 'supertest';
import app from '../../framework/server';

it('returns a 503 error', async () => {
    const res = await request(app).get('/api/sample/').send();
    expect(res.statusCode).toEqual(503);
})