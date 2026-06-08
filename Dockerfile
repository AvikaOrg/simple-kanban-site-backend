ARG NODE_VERSION=24.16.0

# add base image
# used alpine as it is lightweight image
FROM node:${NODE_VERSION}-alpine

RUN addgroup -g 1818 -S mygroup && adduser -u 1818 -S mygroup

WORKDIR /app/workdir/
COPY package*.json ./

RUN npm install

COPY index.js index.js

ENV PORT = 3000
EXPOSE 3000

CMD [ "node", "index.js" ]

