FROM node:latest

#RUN apk add --no-cache bash    // this for alpin

WORKDIR /var/www/shop

COPY docker-entrypoint.sh /usr/local/bin/
RUN ln -s usr/local/bin/docker-entrypoint.sh /entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
