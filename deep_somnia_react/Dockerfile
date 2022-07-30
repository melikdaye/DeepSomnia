FROM node:14-alpine as builder

WORKDIR "/app"

COPY ./package.json ./
RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*
RUN npm install

COPY . .

RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/defult.conf
COPY --from=builder /app/build /usr/share/nginx/html

