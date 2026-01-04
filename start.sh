#!/bin/bash

echo "Starting Vite frontend build and Docker Compose..."

# 1️⃣ Build frontend (з кореня)
echo
echo "=== Installing dependencies and building frontend ==="

# Встановлюємо залежності
npm install
if [ $? -ne 0 ]; then
    echo "npm install failed!"
    read -p "Press Enter to exit..."
    exit 1
fi

# Збираємо продакшн-статику
npm run build
if [ $? -ne 0 ]; then
    echo "Vite build failed!"
    read -p "Press Enter to exit..."
    exit 1
fi
echo "Frontend build completed successfully!"

# 2️⃣ Docker Compose
echo
echo "=== Starting Docker Compose ==="
docker-compose up -d --build
if [ $? -ne 0 ]; then
    echo "Docker Compose failed!"
    read -p "Press Enter to exit..."
    exit 1
fi

echo
echo "All operations completed successfully!"
echo "You can now access the frontend at http://localhost:8085 (prod)"

read -p "Press Enter to finish..."
