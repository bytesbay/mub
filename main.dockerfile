FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run alias

CMD node index.js --es-module-specifier-resolution=node