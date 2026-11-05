#!/bin/bash
# Server initialization script for Toynbee Hall websites
# Run this once on the server to set up the directory structure

set -e

echo "Creating directory structure..."
mkdir -p /var/www/toynbee/toynbee-hall-next
mkdir -p /var/www/toynbee/explore-toynbee-hall

echo "Cloning repositories..."
cd /var/www/toynbee

# Clone the main Next.js site
git clone https://github.com/Toynbee-Hall/toynbee-hall-website-frontend.git toynbee-hall-website-frontend || {
    cd toynbee-hall-website-frontend
    git pull origin main
    cd ..
}

# Clone the explore/archive site
git clone https://github.com/Toynbee-Hall/explore-toynbee-hall.git explore-toynbee-hall || {
    cd explore-toynbee-hall
    git pull origin main
    cd ..
}

echo "Setting up SSL certificates..."
cd /var/www/toynbee/toynbee-hall-website-frontend

# Create certbot directories
mkdir -p certbot/conf certbot/www

# Initial certificate setup (run this interactively first time)
echo "To obtain SSL certificates, run:"
echo "docker compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot -d toynbeehall.org.uk -d www.toynbeehall.org.uk"
echo "docker compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot -d explore.toynbeehall.org.uk"

echo "Starting services..."
docker compose up -d

echo "Server initialization complete!"
