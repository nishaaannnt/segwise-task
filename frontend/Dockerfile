# Use Node.js LTS version as the base
FROM node:18 AS build

# Create app directory
WORKDIR /app

# Install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source code
COPY frontend/ .

# Build the frontend app
RUN npm run build

# Use Nginx to serve the static frontend files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx will serve on (e.g., 80)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
