#! /usr/bin/env sh

nginx
exec pm2-runtime start ecosystem.config.js