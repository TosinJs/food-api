import {
  Model,
  ModelClass,
  UniqueViolationError,
  knexSnakeCaseMappers,
} from 'objection';
import { DBUsersService } from './db.users';
import { UsersModel } from '../models/users.models';
import { v4 as uuid } from 'uuid';
import Knex from 'knex';
import * as dotenv from 'dotenv';
import { Role } from '../../../../types/enum';
dotenv.config();

const knex = Knex({
  client: process.env.DB_CLIENT,
  connection: process.env.TEST_DB_CONNECTION_STRING,
  ...knexSnakeCaseMappers(),
});

Model.knex(knex);

describe('Users Database Service', () => {
  const modelClass: ModelClass<UsersModel> = UsersModel;
  const service: DBUsersService = new DBUsersService(modelClass);

  afterEach(() => modelClass.query().del());

  describe('insert a new user', () => {
    const user = {
      username: 'speck',
      password: 'password',
      id: uuid(),
    };

    it('should return the inserted user', async () => {
      const returnedUser = await service.insert(user);
      expect(returnedUser).toMatchObject({ ...user, role: Role.User });
    });

    it('should throw UniqueViolationError', async () => {
      await service.insert(user);
      expect(service.insert({ ...user, id: uuid() })).rejects.toThrowError(
        UniqueViolationError,
      );
    });
  });

  describe('get a user by username', () => {
    const user = {
      username: 'speck',
      password: 'password',
      id: uuid(),
    };

    it('should get a user', async () => {
      await service.insert(user);
      const returnedUser = await service.getUser(
        { username: user.username },
        'id',
        'password',
        'role',
      );
      expect(returnedUser).toMatchObject({
        id: user.id,
        password: user.password,
        role: Role.User,
      });
    });

    it('should return udefined', async () => {
      const returnedUser = await service.getUser(
        { username: user.username },
        'id',
        'password',
        'role',
      );
      expect(returnedUser).toBeUndefined();
    });
  });
});
