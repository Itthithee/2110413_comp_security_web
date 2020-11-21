FROM node:14.15.0-alpine
WORKDIR /backend
COPY yarn.lock ./
COPY ./package.json ./
RUN yarn install
COPY . .
# EXPOSE 5000
RUN yarn build --tsc
CMD ["yarn", "run","start:prod"]

# -WORKDIR /back
# -COPY . /back
# +WORKDIR /backend
# +COPY ./package.json ./
#  RUN yarn install
# +COPY . .
# +RUN yarn run build
#  EXPOSE 5000
# -CMD yarn start
# \ No newline at end of file
# +CMD ["yarn", "run", "start:prod"]
# +