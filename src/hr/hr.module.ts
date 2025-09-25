import { Module } from '@nestjs/common';
import { HrSubscriber } from './hr.subscriber';

@Module({
  imports: [],
  controllers: [HrSubscriber],
  providers: [],
})
export class HrModule {}
