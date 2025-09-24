import { Module } from '@nestjs/common';
import { ContentSubscriber } from './content.subscriber';

@Module({
  providers: [ContentSubscriber],
})
export class ContentModule {}
