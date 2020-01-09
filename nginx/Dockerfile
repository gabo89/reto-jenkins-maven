from docker.io/nginx 
RUN rm /etc/nginx/conf.d/default.conf
COPY reverse.conf /etc/nginx/conf.d
EXPOSE 85
HEALTHCHECK CMD curl --fail http://localhost:85/ || exit 1
