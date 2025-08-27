#!/bin/bash

# Demo Generator Production Deployment Script
# Usage: ./scripts/deploy.sh

set -e

echo "🚀 Starting Demo Generator deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run from demo-generator root directory"
    exit 1
fi

# Create logs directory
echo "📁 Creating logs directory..."
mkdir -p logs

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️ Warning: .env file not found. Copying from example..."
    cp .env.example .env
    echo "✏️ Please edit .env with your API keys before starting"
fi

# Install PM2 if not present
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    npm install -g pm2
fi

# Stop existing process if running
echo "⏹️ Stopping existing processes..."
pm2 stop demo-generator || echo "No existing process found"
pm2 delete demo-generator || echo "No process to delete"

# Start with PM2
echo "🚀 Starting with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

# Setup PM2 startup script (Linux/Mac only)
if [[ "$OSTYPE" == "linux-gnu"* ]] || [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🔧 Setting up PM2 startup script..."
    pm2 startup || echo "PM2 startup setup failed - please run manually"
fi

# Show status
echo "📊 Process status:"
pm2 status

# Show logs command
echo "📝 To view logs: pm2 logs demo-generator"
echo "🏥 Health check: curl http://localhost:3000/health"
echo "✅ Deployment complete!"

# Test health check
sleep 3
echo "🧪 Testing health check..."
if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    echo "✅ Health check passed!"
else
    echo "⚠️ Health check failed - check logs with: pm2 logs demo-generator"
fi