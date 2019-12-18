# syntax=docker/dockerfile:experimental

# Build stage: Install yarn dependencies
# ===
FROM node:10-slim AS yarn-dependencies
WORKDIR /srv
ADD package.json .
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn yarn install

# Build stage: Run "yarn run build-jekyll"
# ===
# FROM jekyll/jekyll AS build-jekyll
# ADD _site _site
# RUN yarn run build-jekyll

# Build stage: Run "yarn run build-css"
# ===
FROM yarn-dependencies AS build-css
ADD . .
RUN yarn run build


# Build the production image
# ===
FROM ubuntu:bionic
RUN apt-get update && apt-get --no-install-recommends --yes install nginx ruby-full make gcc nodejs build-essential patch
RUN gem install jekyll bundler

# Set up environment
ENV LANG C.UTF-8
WORKDIR /srv


# Import code, build assets and mirror list
RUN rm -rf package.json yarn.lock .babelrc webpack.config.js
COPY --from=build-css /srv/ .
# COPY --from=build-jekyll /srv/_site _site
ENV PATH="/root/.local/bin:${PATH}"

ARG BUILD_ID
WORKDIR /srv
ADD . .
ADD nginx.conf /etc/nginx/sites-enabled/default
RUN sed -i "s/~BUILD_ID~/${BUILD_ID}/" /etc/nginx/sites-enabled/default

# Setup commands to run server
CMD ["nginx", "-g", "daemon off;"]
