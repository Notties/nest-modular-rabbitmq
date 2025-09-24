import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { HrModule } from './hr/hr.module';

@Module({
  imports: [AuthModule, ContentModule, HrModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
