import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateDebtorDto } from '../src/debtor/dto/create-debtor.dto';
import { AuthDto } from '../src/auth/dto/auth.dto';

const loginDto: AuthDto = {
  login: 'test@mail.ru',
  password: '123',
};

const testDto: CreateDebtorDto = {
  firstName: 'Иван',
  lastName: 'Петрович',
  patronymic: 'Алексеев',
  dateOfBirth: new Date('1990-10-22'),
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdRecordId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto);

    token = body.access_token;
  });

  it('/debtor/create (POST) - success', async (done) => {
    return request(app.getHttpServer())
      .post('/debtor/create ')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdRecordId = body.id;
        expect(createdRecordId).toBeDefined();
        done();
      });
  });

  it('/debtor/:id (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete('/debtor/' + createdRecordId)
      .set('Authorization', 'Bearer' + token)
      .expect(200);
  });

  //FIND - success
  //FIND - fail
  //DELETE - fail expect(404, {statusCode: 404, message: DEBTOR_NOT_FOUND})

  afterAll(() => {
    // CLOSE DATABASE CONNECTION
  });
});
