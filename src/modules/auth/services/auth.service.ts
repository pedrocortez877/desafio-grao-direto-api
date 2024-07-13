import { SignUpDto } from './../dtos/signup.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../../../common/services/hash.service';
import { UsersService } from 'src/modules/users/services/user.service';
import { User } from '@prisma/client';
import { SignInDto } from '../dtos/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    if (await this.hashService.compare(pass, user.password)) {
      return user;
    }

    return null;
  }

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const user = await this.validateUser(signInDto.email, signInDto.password);

    if (!user) {
      throw new UnauthorizedException('Suas credenciais são inválidas');
    }

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(signUpDto: SignUpDto) {
    return this.usersService.create(signUpDto);
  }
}
