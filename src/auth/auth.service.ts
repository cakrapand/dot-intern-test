import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { checkPassword } from 'src/helpers/password.helper';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByUsername(loginDto.username);

    if (!user || !(await checkPassword(loginDto.password, user.password)))
      throw new UnauthorizedException('Wrong username or password');

    const payload: IJwtPayload = {
      id: user.id,
      username: user.username,
    };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
