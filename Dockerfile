FROM nginx:alpine

# Set working directory to Nginx html root
WORKDIR /usr/share/nginx/html

# Remove default static files
RUN rm -rf ./*

# Copy application files
COPY . .

# Remove repository/build files from public webroot
RUN rm -rf .git Dockerfile docker-compose*.yml README.md

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
