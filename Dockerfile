# syntax=docker/dockerfile:experimental

# Build stage: Install yarn dependencies
# ===
FROM node:10-slim AS yarn-dependencies
WORKDIR /srv
ADD package.json .
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn yarn install

# Build stage: Run "yarn run build-css"
# ===
FROM yarn-dependencies AS build-css
ADD . .
RUN yarn run build


# Build the production image
# ===
FROM ubuntu:bionic
RUN apt-get update && apt-get --no-install-recommends --yes install nginx

# Set up environment
ENV LANG C.UTF-8
WORKDIR /srv


# Import code, build assets and mirror list
ADD . .
RUN rm -rf package.json yarn.lock .babelrc webpack.config.js
COPY --from=build-css /srv/css css
ENV PATH="/root/.local/bin:${PATH}"

ARG BUILD_ID
WORKDIR /srv
ADD _site .
ADD nginx.conf /etc/nginx/sites-enabled/default
RUN sed -i "s/~BUILD_ID~/${BUILD_ID}/" /etc/nginx/sites-enabled/default

# Setup commands to run server
CMD ["nginx", "-g", "daemon off;"]
