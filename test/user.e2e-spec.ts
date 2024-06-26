import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user/register (POST)', async () => {
    const registerData = {
      username: 'birkan',
      email: 'birkan5450@gmail.com',
    };

    const response = await request(app.getHttpServer())
      .post('/user/register')
      .send(registerData)
      .expect(201);

    expect(response.body).toHaveProperty('username', 'birkan');
    expect(response.body).toHaveProperty('email', 'birkan5450@gmail.com');
    expect(response.body).toHaveProperty('verificationToken');
    expect(response.body.isVerified).toBe(false);
  });

  afterAll(async () => {
    await app.close();
  });
});
