FROM nginx:latest

# Create cache directory and set permissions
RUN mkdir -p /data/nginx/cache \
    && chown -R nginx:nginx /data/nginx/cache

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8081

CMD ["nginx", "-g", "daemon off;"]