# Use the official Node.js image as the base image
FROM node:20-alpine

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install TypeScript globally
RUN npm install -g typescript ts-node

# Build the TypeScript code
RUN npm run build

# Expose the application port
EXPOSE 7000

# Start the application
CMD ["node", "dist/src/server.js"]