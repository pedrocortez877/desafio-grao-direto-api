import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private readonly saltRounds = 10;

  async hash(text: string): Promise<string> {
    return bcrypt.hash(text, this.saltRounds);
  }

  async compare(text: string, hashedtext: string): Promise<boolean> {
    return bcrypt.compare(text, hashedtext);
  }
}
