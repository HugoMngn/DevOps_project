FROM node:18-alpine AS build
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build --source-map
# deploy
FROM nginx
EXPOSE 80
COPY ./docker/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/tennis-player/browser/ /usr/share/nginx/html
