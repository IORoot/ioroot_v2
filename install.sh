#!/bin/bash

echo "Installing dependencies for Andy Pearson Portfolio Website..."

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Install dependencies
echo "Installing npm packages..."
npm install

# Create necessary directories
echo "Creating directories..."
mkdir -p src/content/articles
mkdir -p src/content/websites
mkdir -p static/images

# Create a sample article
echo "Creating sample content..."
cat > src/content/articles/performance-tips.mdx << 'EOF'
---
title: "Building High-Performance Web Apps"
date: "2024-01-15"
description: "Tips and tricks for optimizing your web applications for speed and user experience."
tags: ["Performance", "Web Development", "Optimization"]
---

# Building High-Performance Web Apps

Performance is crucial for user experience. Here are some key strategies...

## Code Splitting

One of the most effective ways to improve performance is through code splitting...

## Image Optimization

Optimizing images can significantly reduce load times...

## Caching Strategies

Implementing proper caching can dramatically improve performance...
EOF

echo "Installation complete! Run 'npm run dev' to start the development server." 