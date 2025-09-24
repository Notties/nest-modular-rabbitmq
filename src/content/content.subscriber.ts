import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class ContentSubscriber {
  // Use @EventPattern() to listen to a specific event
  @EventPattern('user.profile.updated')
  handleUserProfileUpdated(
    @Payload() data: { userId: string; newName: string },
  ) {
    console.log(
      `[ContentSubscriber] Received event! User profile has been updated.`,
    );
    console.log(
      `[ContentSubscriber] => User ID: ${data.userId}, New Name: ${data.newName}`,
    );
    console.log(
      `[ContentSubscriber] => Now, I'm updating all news posts authored by this user... DONE.`,
    );
  }
}
