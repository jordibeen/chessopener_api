FROM node:alpine

WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent --only=production

COPY . ./

CMD [ "node", "index.js" ]
