FROM node:10.15.3-alpine
STOPSIGNAL SIGTERM
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp -g
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
ENV NODE_ENV=production
COPY . .
EXPOSE 3000
ENTRYPOINT npm run start


