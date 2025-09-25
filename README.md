# 🚀 NestJS Modular Monolith with RabbitMQ Example

This project is a boilerplate and demonstration of a **Modular Monolith** architecture where internal communication is handled via an **Event-Driven Architecture (EDA)**, using **NestJS** and **RabbitMQ** as the core technologies.

The goal of this project is to showcase how to build an application that is:
*   **Decoupled:** Modules do not have direct knowledge of or dependencies on each other.
*   **Resilient:** The failure of one non-critical module does not impact the core functionality of another.
*   **Scalable:** Designed to be easily broken down into individual Microservices in the future.

## 🏛️ Demonstrated Architecture

This project simulates a scenario where updating a user's profile (e.g., changing their name) triggers an event that propagates this change to other relevant modules asynchronously.

1.  **Synchronous Write:** The `AuthModule` receives an API request to change a user's name. It performs its primary task (simulating a database write) and returns an immediate `200 OK` response. This provides a fast user experience.
2.  **Asynchronous Replication:** After the successful write, the `AuthModule` **publishes** an event named `user.profile.updated` to the RabbitMQ message broker.
3.  **Event Consumption:** The `ContentModule` and `HrModule`, acting as **Subscribers**, consume this event from the queue and perform their own background tasks (e.g., updating the author's name on all news posts, updating the employee's name in all leave requests).

## 🛠️ Tech Stack

*   **Framework**: [NestJS](https://nestjs.com/)
*   **Message Broker**: [RabbitMQ](https://www.rabbitmq.com/)
*   **Containerization**: [Docker](https://www.docker.com/) & Docker Compose
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Package Manager**: [pnpm](https://pnpm.io/)

## 🏁 Getting Started

You must have [Docker](https://www.docker.com/products/docker-desktop/) installed on your machine to run this project.

### 1. Clone the Repository

```bash
git clone https://github.com/notties/nest-modular-rabbitmq.git
cd nest-modular-rabbitmq
```

### 2. Run the Project with Docker Compose

This single command will build the Docker image for the NestJS application and start all required containers (the app and RabbitMQ).

```bash
docker-compose up --build
```

Wait a moment until you see the confirmation logs in your terminal, indicating that the system is up and running:

```log
[Bootstrap] 🚀 HTTP Server is running on: http://localhost:3000
[Bootstrap] 👂 Microservice is listening for events on queue "app_queue"
```

## 🧪 How to Test

Your system is now ready to receive API requests and process events.

### 1. Open a New Terminal

Leave the existing terminal running Docker Compose. Open a new terminal window to send a request.

### 2. Trigger the API Endpoint

Use the following `curl` command to send a `PUT` request to update a user's name.

```bash
curl -X PUT http://localhost:3000/users/123/profile \
-H "Content-Type: application/json" \
-d '{"name": "John Doe"}'
```

### 3. Check the Logs for the Result

Switch back to your original terminal where `docker-compose` is running. You will see the complete, successful log flow printed out:

```log
--- Received API request to update user 123 ---
[AuthService] Step 1: Updating user 123's name to 'John Doe' in our own database...
[AuthService] Step 2: User name updated successfully!
[AuthService] Step 3: Publishing 'user.profile.updated' event...

# --- The event is processed asynchronously almost instantly ---

[ContentSubscriber] Received event! User profile has been updated.
[ContentSubscriber] => User ID: 123, New Name: John Doe
[ContentSubscriber] => Now, I'm updating all news posts authored by this user... DONE.

[HrSubscriber] Received event! User profile has been updated.
[HrSubscriber] => User ID: 123, New Name: John Doe
[HrSubscriber] => Now, I'm updating all leave requests for this employee... DONE.
```

This log output confirms that the event was successfully published and consumed by all subscribers.

## 📂 Project Structure

*   **`src/auth/`**: The module that acts as the **Event Publisher**. It's responsible for user management and emitting events.
*   **`src/content/`** & **`src/hr/`**: Modules that act as **Event Subscribers**. They listen for specific events and process them.
*   **`docker-compose.yml`**: The configuration file for orchestrating all services (NestJS App & RabbitMQ). It includes a `healthcheck` to ensure the app waits for RabbitMQ to be ready.
*   **`Dockerfile`**: The blueprint for building the NestJS application's Docker image using `pnpm`.
*   **`.dockerignore`**: Prevents unnecessary files (like local `node_modules`) from being copied into the Docker image.

## 💡 Troubleshooting

### Common Issue: `PRECONDITION_FAILED` Error

If you encounter an error message containing `PRECONDITION_FAILED - inequivalent arg 'durable' for queue`, it is typically caused by a stale Docker volume that holds a RabbitMQ queue with properties that conflict with the current code.

**Solution:** Stop the containers and remove all associated volumes to ensure a clean start.

```bash
docker-compose down -v
```

Then, run `docker-compose up --build` again.

## Stop running services

To stop all running services:

```bash
docker-compose down
```