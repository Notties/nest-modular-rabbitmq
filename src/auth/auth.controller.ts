import { Controller, Put, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Put(':id/profile')
  updateProfile(@Param('id') id: string, @Body('name') name: string) {
    console.log(`\n--- Received API request to update user ${id} ---`);
    return this.authService.updateUserAndPublishEvent(id, name);
  }
}
