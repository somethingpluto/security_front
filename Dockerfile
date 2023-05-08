FROM nginx

MAINTAINER 1575197604@qq.com

RUN rm /etc/nginx/conf.d/default.conf

ADD default.conf /etc/nginx/conf.d/

ADD dist/ /usr/share/nginx/html/
