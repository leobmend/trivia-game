FROM node:16-alpine

WORKDIR /backend

COPY . .

RUN npm install

EXPOSE 3001

ENTRYPOINT [ "npm", "start" ]