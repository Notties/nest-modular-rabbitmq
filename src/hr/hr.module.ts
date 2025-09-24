import { Module } from '@nestjs/common';
import { HrSubscriber } from './hr.subscriber';

@Module({
  providers: [HrSubscriber],
})
export class HrModule {}
