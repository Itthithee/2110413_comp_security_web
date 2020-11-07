FROM node:alpine
WORKDIR /front
COPY package*.json /front
RUN yarn install
COPY . /front
EXPOSE 3000
CMD yarn start :dev