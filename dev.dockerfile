FROM node:22-alpine

RUN apk update && apk upgrade

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install -g ts-node-dev

COPY . .

EXPOSE 3000

CMD ["ts-node-dev", "--respawn", "--transpile-only", "src/app.ts"]