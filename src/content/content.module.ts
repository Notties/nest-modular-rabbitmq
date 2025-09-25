import { Module } from '@nestjs/common';
import { ContentSubscriber } from './content.subscriber';

@Module({
  imports: [],
  controllers: [ContentSubscriber],
  providers: [],
})
export class ContentModule {}
