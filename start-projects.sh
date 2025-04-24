#!/bin/bash

set -e

# Start Spring Boot backend
echo "Starting Spring Boot backend..."
cd vidforge-backend
./mvnw spring-boot:run &
BACKEND_PID=$!
cd ..

# Start React frontend
echo "Starting React frontend..."
cd vidforge-frontend-react  
npm install  
npm start &
FRONTEND_PID=$!
cd ..

# Trap CTRL+C to stop both processes
trap "echo 'Stopping projects...'; kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT

wait
