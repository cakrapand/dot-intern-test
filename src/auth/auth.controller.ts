import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, loginSchema } from './dto/login.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body(new ZodValidationPipe(loginSchema)) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
