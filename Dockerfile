FROM node:current-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci --silent

COPY . .
CMD [ "node", "index.js" ]