FROM node:12-alpine as build
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM socialengine/nginx-spa as prod
WORKDIR /app
COPY --from=build /app/dist /app