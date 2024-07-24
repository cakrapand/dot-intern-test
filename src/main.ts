import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/reponse.interceptor';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { AuthGuard } from './common/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new AuthGuard(new JwtService({}), app.get(Reflector)));

  await app.listen(3000);
}
bootstrap();
