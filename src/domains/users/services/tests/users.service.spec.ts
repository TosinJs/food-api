import { Test, TestingModule } from '@nestjs/testing';
import { JwtTokenService } from '../jwt.service';
import { v4 as uuidv4 } from 'uuid';
import { DBUsersService } from '../../database/service/db.users';
import { UsersService } from '../users.service';
import { EncryptService } from '../encrypt.service';
import { Role } from '../../../../types/enum';
import { UsersModel } from '../../database/models/users.models';

describe('JwtTokenService', () => {
  let service: UsersService;
  let jwtTokenService: JwtTokenService;
  let dbService: DBUsersService;
  let encryptService: EncryptService;

  const user = {
    username: 'username',
    password: 'password',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DBUsersService,
          useFactory: () => ({
            insert: jest.fn().mockImplementation(),
            getUser: jest.fn(
              async (): Promise<Partial<UsersModel>> => ({
                id: uuidv4(),
                password: await encryptService.encrypt(user.password),
                role: Role.User,
              }),
            ),
          }),
        },
        EncryptService,
        {
          provide: JwtTokenService,
          useFactory: () => ({
            generateIdToken: jest.fn(() => 'token'),
          }),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jwtTokenService = module.get<JwtTokenService>(JwtTokenService);
    dbService = module.get<DBUsersService>(DBUsersService);
    encryptService = module.get<EncryptService>(EncryptService);
  });

  describe('create a new user', () => {
    it('should create a new user', async () => {
      jest.spyOn(encryptService, 'encrypt');
      const token = await service.create(user);
      expect(dbService.insert).toBeCalledWith({
        ...user,
        id: expect.any(String),
        password: expect.any(String),
      });
      expect(jwtTokenService.generateIdToken).toBeCalledWith(
        {
          id: expect.any(String),
          username: user.username,
          role: Role.User,
        },
        '24h',
      );
      expect(token).toEqual('token');
    });
  });

  describe('login a user', () => {
    it('should log a user in', async () => {
      jest.spyOn(encryptService, 'compare');
      const token = await service.login(user);
      expect(dbService.getUser).toBeCalledWith(
        { username: user.username },
        'id',
        'password',
        'role',
      );
      expect(encryptService.compare).toBeCalledTimes(1);
      expect(jwtTokenService.generateIdToken).toBeCalledWith(
        {
          id: expect.any(String),
          username: user.username,
          role: Role.User,
        },
        '24h',
      );
      expect(token).toEqual('token');
    });
  });
});
