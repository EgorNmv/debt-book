import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto/auth.dto';

const loginDto: AuthDto = {
  login: 'test@mail.ru',
  password: '123',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let createdRecordId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - success', async (done) => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.access_token).toBeDefined();
        done();
      });
  });

  it('/auth/login (POST) - fail(wrong password)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: '3322' })
      .expect(401, {
        statusCode: 401,
        message: 'Неверный пароль',
        error: 'Unauthorized',
      });
  });

  it('/auth/login (POST) - fail(wrong email)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, login: '12312' })
      .expect(401, {
        statusCode: 401,
        message: 'Пользователь с таким email не найден',
        error: 'Unauthorized',
      });
  });
});
