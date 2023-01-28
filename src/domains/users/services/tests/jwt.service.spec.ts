import { Test, TestingModule } from '@nestjs/testing';
import { JwtTokenService } from '../jwt.service';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';

describe('JwtTokenService', () => {
  let service: JwtTokenService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtTokenService,
        {
          provide: ConfigService,
          useFactory: () => ({
            get: jest.fn(() => 'string'),
          }),
        },
      ],
    }).compile();

    service = module.get<JwtTokenService>(JwtTokenService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should return a jwt', async () => {
    const payload = {
      id: 'string',
      username: 'string',
      role: 'admin',
    };
    const token = await service.generateIdToken(payload, '1h');
    expect(configService.get).toBeCalledTimes(1);
    const returnedPayload = verify(token, configService.get('JWT_SECRET'));
    expect(returnedPayload).toMatchObject(payload);
  });
});
