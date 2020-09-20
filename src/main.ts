import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filter/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({ origin: '*'});
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //   }),
  // );

  const documentBuilderOptions = new DocumentBuilder()
    .setTitle('BvAT - Grants Management API')
    .setVersion('1.0')
    .addTag('User Management')
    .addTag('Authentication')
    .addTag('Application Management')
    .addTag('Application Template Management')
    .addTag('Menu Management')
    .addTag('File Management')
    .addTag('Whistleblow Management')
    .addTag('User Roles')
    .addTag('User Group Management')
    .addTag('Permissions Management')
    .addTag('Notification Management')
    .addTag('Event Management')
    .addTag('Evaluation Management')
    .addTag('Comment Management')
    .addTag('Clarification Management')
    .build();

    const apiDocumentation = SwaggerModule.createDocument(app, documentBuilderOptions);
    SwaggerModule.setup('api/7cfa87c2-e387-4e4a-bca9-216e74f72643', app, apiDocumentation);


  await app.listen(3000);
}
bootstrap();
