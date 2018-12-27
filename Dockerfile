FROM node

WORKDIR /aaxadmin

COPY ./package.json .
COPY ./packages/common/package.json ./packages/common

RUN npm i -g yarn
RUN yarn install --production
