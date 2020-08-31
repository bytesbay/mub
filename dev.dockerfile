FROM node:13-alpine

WORKDIR /usr/src/app

CMD npm i && npm run alias && npm run start