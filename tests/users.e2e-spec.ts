import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e', () => {
	it('Register - error', async () => {
		const res = await request(application.app)
			.post('/users/register')
			.send({ email: 'aa@aa.ru', password: 'password' });
		expect(res.statusCode).toBe(422);
	});

	it('Login - success', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'meekdest1@gmail.com', password: '123' });
		expect(res.statusCode).toBe(200);
	});

	it('Login - success (JWT)', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'meekdest1@gmail.com', password: '123' });
		expect(res.body.jwt).not.toBeUndefined;
	});

	it('Login - error (JWT)', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: 'meekdest1@gmail.com', password: '1' });
		expect(res.statusCode).toBe(401);
	});

	it('Info - success', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'meekdest1@gmail.com', password: '123' });
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);
		expect(res.body.email).toBe('meekdest1@gmail.com');
	});

	it('Info - error', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'meekdest1@gmail.com', password: '123' });
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer 11111`);
		expect(res.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});
