# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies (cache mount)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
