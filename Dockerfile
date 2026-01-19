ARG NODE_VERSION=20.20-alpine
ARG NGINX_VERSION=1.28.0-alpine
ARG PORT=80

FROM node:${NODE_VERSION} AS builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:${NGINX_VERSION}

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/weather-app/browser /usr/share/nginx/html

EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]
