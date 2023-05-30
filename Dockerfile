FROM node:18.16-alpine

WORKDIR /app

COPY package.json yarn.lock ./

ENV NODE_ENV=production

RUN yarn install --frozen-lockfile --production && yarn cache clean

COPY ./.container/crontab /etc/crontabs/root

COPY . .

RUN yarn db:regenerate && yarn build && rm prisma/dev.db && yarn cache clean

EXPOSE 80

CMD ["yarn", "start:in-container"]

