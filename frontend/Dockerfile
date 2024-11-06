# Step 1: Use Node.js to build the Vite app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend source code
COPY frontend/ .

# Build the frontend app with Vite for production
RUN npm run build

# Step 2: Use Nginx to serve the static files
FROM nginx:alpine

# Copy the production build from Vite to Nginx's default HTML location
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
