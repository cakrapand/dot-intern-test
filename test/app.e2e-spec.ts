import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 401 for unauthenticated access to protected route', () => {
    return request(app.getHttpServer()).get('/posts').expect(401);
  });

  it('should authenticate and return token', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'cakracakra', password: 'cakracakra' })
      .expect(200)
      .expect((res) => expect(res.body.data).toHaveProperty('token'));
  });

  it('should access protected route with valid token', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'cakracakra', password: 'cakracakra' })
      .expect(200);

    const token = loginResponse.body.data.token;

    return request(app.getHttpServer())
      .get('/posts')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
