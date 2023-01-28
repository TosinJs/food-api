import { Test, TestingModule } from '@nestjs/testing';
import { EncryptService } from '../encrypt.service';

describe('EncryptService', () => {
  let service: EncryptService;
  const password = 'password';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptService],
    }).compile();

    service = module.get<EncryptService>(EncryptService);
  });
  describe('encrypt - decrypt process', () => {
    it('should hash and compare passwords', async () => {
      const hash = await service.encrypt(password);
      expect(await service.compare(hash, password)).toBeTruthy();
      expect(await service.compare(hash, 'fakepassword')).toBeFalsy();
    });
  });
});
