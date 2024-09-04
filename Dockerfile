FROM node:18.20.4-alpine

WORKDIR /usr/app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable
RUN corepack prepare pnpm@latest-9 --activate
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpx prisma generate
RUN pnpm build

CMD [ "pnpm", "run", "start:prod" ]