import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true
  }));

  const config = new DocumentBuilder()
    .setTitle('Backend Test Task')
    .setDescription('The Backend Simple App with Nestjs framework')
    .setVersion('1.0')
    .addTag('nestjs')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT, () => console.log('server running...'));
}
bootstrap();