# Dockerfile
FROM node:20.12.0-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install
RUN npm run build
RUN npm run migrations

EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]