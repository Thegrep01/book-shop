#!/bin/bash

cd /var/www/shop

if [ ! -d /var/www/shop/node_modules ]; then
  npm cache clean -f  &&  npm install
fi;

npm run start:dev
