FROM node:21-alpine as base

WORKDIR /src
COPY package*.json /
COPY ./prisma prisma
COPY ./prisma/dev.db /prisma/dev.db


EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["node", "bin/www"]

FROM base as dev
ENV NODE_ENV=development

RUN npm install -f

# init prisma
RUN npx prisma generate --schema=./prisma/schema.prisma


COPY . /
CMD ["nodemon", "bin/www"]
