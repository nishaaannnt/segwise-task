# Use Node.js LTS version as the base
FROM node:18

# Create app directory
WORKDIR /app

# Install dependencies

COPY backend/package*.json ./
RUN npm install
RUN npm install nodemon -g

# Copy backend code
COPY backend/ .

# Expose backend port (e.g., 3000)
EXPOSE 3000

# Start the backend server
CMD ["nodemon", "index.js"]
