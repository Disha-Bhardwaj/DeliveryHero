# base image
FROM node:14.1-alpine AS builder

RUN apk add --update git

USER node

WORKDIR /home/node

COPY package.json package-lock.json /home/node/

COPY index.js /home/node/

ARG GIT_TOKEN

ARG configuration

RUN npm install

COPY ./ /home/node/

RUN npm run build -- --configuration $configuration

# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx:alpine

COPY --from=builder /home/node/dist /usr/share/nginx/html

COPY ./config/nginx-custom.conf /etc/nginx/conf.d/default.conf
