import { Injectable } from '@nestjs/common';
import { pbkdf2Sync } from 'crypto';

@Injectable()
export class PasswordService {
  private salt: string;
  constructor() {
    this.salt = 'vfTuZnIWInJe4QF7KRqFHaOkHv8NH+Q6dHo4Q2RXyYY=';
  }

  hash(password) {
    return pbkdf2Sync(password, this.salt, 10000, 256, 'sha256').toString(
      'hex',
    );
  }

  validate(password, hashedPassword) {
    return this.hash(password) === hashedPassword;
  }
}
