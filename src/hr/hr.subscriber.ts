import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class HrSubscriber {
  @EventPattern('user.profile.updated')
  handleUserProfileUpdated(
    @Payload() data: { userId: string; newName: string },
  ) {
    console.log(
      `[HrSubscriber] Received event! User profile has been updated.`,
    );
    console.log(
      `[HrSubscriber] => User ID: ${data.userId}, New Name: ${data.newName}`,
    );
    console.log(
      `[HrSubscriber] => Now, I'm updating all leave requests for this employee... DONE.`,
    );
  }
}
