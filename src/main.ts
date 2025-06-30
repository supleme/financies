// Em src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Importe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Finances API') // Título da sua API
    .setDescription('Documentação da API do app Finances') // Descrição
    .setVersion('1.0')
    .addBearerAuth() // Essencial para habilitar o uso de token JWT no Swagger 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Define a rota da documentação

  await app.listen(3000);
}
bootstrap();