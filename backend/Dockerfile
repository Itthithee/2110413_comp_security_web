FROM node:14.15.0-alpine
WORKDIR /backend
COPY ./package.json ./
RUN yarn install
COPY . .
EXPOSE 5000
RUN yarn build
CMD ["yarn", "run", "start:prod"]