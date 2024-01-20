# Dockerfile
# Stage 1: Install dependencies
FROM node:6-alpine as builder

# Add label for metadata
LABEL name="mauketik-api" \
      version="1.0" \
      description="A MauKetik API"

# Install tini
RUN apk add --update tini
# Use Node 16 alpine as parent image
FROM node:16-alpine

# Change the working directory on the Docker image to /app
WORKDIR /app

# Copy package.json and package-lock.json to the /app directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install
# Copy the rest of project files into this image
COPY . .

ENV NODE_ENV=production
# Setel user yang tidak memiliki hak akses root untuk menjalankan kontainer. Ini meningkatkan keamanan aplikasi.
USER node

# Expose application port
# EXPOSE 3000 // kalau sudah di define di compose tidak perlu define di Dockerfile

# Start the application
CMD npm start
