import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
      queue: 'app_queue',
      noAck: false, // Ensure messages are acknowledged
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.startAllMicroservices();

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  logger.log(`🚀 HTTP Server is running on: http://localhost:${port}`);
  logger.log(`👂 Microservice is listening for events on queue "app_queue"`);
}
bootstrap();
