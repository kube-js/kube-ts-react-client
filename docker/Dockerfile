FROM node:10.16.0-alpine as builder

STOPSIGNAL SIGTERM
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python git
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install --quiet node-gyp -g
COPY package*.json ./
RUN npm ci
COPY . .
RUN PUBLIC_URL=/ npm run build

FROM nginx:1.17.1-alpine as app

# Add bash
RUN apk add --no-cache bash

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/docker/env.sh /usr/share/nginx/html/env.sh
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY --from=builder /usr/src/app/.env /usr/share/nginx/html/.env

# Make our shell script executable
RUN chmod +x /usr/share/nginx/html/env.sh
EXPOSE 80
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
