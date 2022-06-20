FROM node:16.13-current-alpine

WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent

COPY . ./

CMD [ "node", "index.js" ]
