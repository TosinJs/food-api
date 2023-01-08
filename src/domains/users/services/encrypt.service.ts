import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class EncryptService {
  async encrypt(text: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(text, salt);
  }

  async compare(hash: string, text: string): Promise<boolean> {
    return bcrypt.compare(text, hash);
  }
}
