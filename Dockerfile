FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN pnpm install

COPY . .

CMD ["pnpm", "run", "start:dev"]