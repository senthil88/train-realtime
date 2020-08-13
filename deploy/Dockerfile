FROM node:14.8-alpine3.10
ENV NODE_ENV=${NODE_ENV}

RUN apk update
RUN apk add --update \
  build-base \
  logrotate \
  nginx \ 
  && rm -rf /var/cache/apk/*

# NGINX & PM2
COPY deploy/nginx.conf /etc/nginx/nginx.conf
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN npm install --global pm2

# LOGROTATE CONFIG
RUN mkdir -p /log/old/pm2
COPY deploy/logrotate-pm2 /etc/logrotate.d

# NEXT JS APPLICATION
RUN mkdir -p /usr/src/app
RUN mkdir -p /var/log/pm2
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install --production

COPY . /usr/src/app

# SHELL SCRIPT
COPY deploy/start.sh /start.sh
COPY deploy/ecosystem.config.js /usr/src/app/ecosystem.config.js
RUN chmod +x /start.sh

# START CRON | NGINX | PM2
ENTRYPOINT [ "/bin/sh" ]
CMD [ "/start.sh" ]