FROM node:14.15.0-alpine
WORKDIR /back
COPY . /back
RUN yarn install
RUN add group -S appgroup && adduser -S appuser -G appgroup
USER appuser 
EXPOSE 5000
CMD yarn start