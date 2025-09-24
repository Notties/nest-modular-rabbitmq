import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(@Inject('EVENT_BUS') private readonly eventBus: ClientProxy) {}

  async updateUserAndPublishEvent(userId: string, newName: string) {
    // --- 1. Synchronous Part ---
    console.log(
      `[AuthService] Step 1: Updating user ${userId}'s name to '${newName}' in our own database...`,
    );
    console.log('[AuthService] Step 2: User name updated successfully!');

    // --- 2. Asynchronous Part ---
    const eventPayload = { userId, newName, timestamp: new Date() };

    console.log(
      `[AuthService] Step 3: Publishing 'user.profile.updated' event...`,
    );
    // Use .emit() to send the event out without waiting for a response
    this.eventBus.emit('user.profile.updated', eventPayload);

    return { message: 'User updated and event published successfully!' };
  }
}
