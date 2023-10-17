FROM node:18-alpine

WORKDIR /srv/server

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN npx prisma generate

CMD ["yarn", "dev"]
