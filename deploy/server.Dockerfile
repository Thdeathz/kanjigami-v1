FROM node:18-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 80

RUN yarn build

