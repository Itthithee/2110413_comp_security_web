FROM node:14.15.0-alpine
WORKDIR /frontend
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 4000
CMD ["yarn", "run", "start"]