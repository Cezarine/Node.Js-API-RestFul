import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // Ignora tudo no Body(Json) que não estiver no DTO, ou seja, se passar uma propriedade a mais ele irá ignorar.
      forbidNonWhitelisted: true // Ele pega essa propriedade a mais que foi passada no Body(Json) e exibe um erro.
    })
  );
  useContainer(app.select(AppModule), {fallbackOnErrors: true});// Aqui diz para o Validator injetar as dependências igual o NestJS faz, caso não consigo ele mesmo tenta injectar
  await app.listen(3000);
}
bootstrap();

