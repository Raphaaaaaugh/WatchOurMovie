# Use the official MySQL image from Docker Hub
FROM mysql:latest

# Environment variables
ENV MYSQL_ROOT_PASSWORD=root

# Copy the initialization script into the container
COPY init.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306
