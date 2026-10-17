FROM nginx:alpine

# Configure Nginx to listen on both port 80 and port 3000 (Coolify's default exposed port)
RUN printf 'server {\n\
    listen 80;\n\
    listen 3000;\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html index.htm;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

# Set working directory to Nginx html root
WORKDIR /usr/share/nginx/html

# Remove default static files
RUN rm -rf ./*

# Copy application files
COPY . .

# Remove repository/build files from public webroot
RUN rm -rf .git Dockerfile docker-compose*.yml README.md LICENSE*

# Expose both standard HTTP (80) and Coolify default (3000)
EXPOSE 80 3000

CMD ["nginx", "-g", "daemon off;"]
