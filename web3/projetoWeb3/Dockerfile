FROM node:21-alpine as base

WORKDIR /src
COPY package*.json /
COPY tsconfig*.json /
COPY .env /
COPY ./prisma prisma
COPY ./prisma/dev.db /prisma/dev.db

EXPOSE 3005


FROM base as dev
ENV NODE_ENV=development

RUN npm install -g increase-memory-limit increase-memory-limit
RUN npm install package.json

RUN npx prisma generate --schema=./prisma/schema.prisma

COPY . /

