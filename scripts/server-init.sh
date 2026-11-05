#!/bin/bash
# Server initialization script for Toynbee Hall websites
# Run this once on the server to set up the directory structure

set -e

echo "Creating directory structure..."
mkdir -p /var/www/toynbee/toynbee-hall-next
mkdir -p /var/www/toynbee/explore-toynbee

echo "Cloning repositories..."
cd /var/www/toynbee

# Clone the main Next.js site
git clone https://github.com/Toynbee-Hall/toynbee-hall-next.git toynbee-hall-next || {
    cd toynbee-hall-next
    git pull origin main
    cd ..
}

# Clone the explore/archive site
git clone https://github.com/Toynbee-Hall/explore-toynbee.git explore-toynbee || {
    cd explore-toynbee
    git pull origin main
    cd ..
}

echo "Setting up SSL certificates..."
cd /var/www/toynbee/toynbee-hall-next

# Create certbot directories
mkdir -p certbot/conf certbot/www

# Initial certificate setup (run this interactively first time)
echo "To obtain SSL certificates, run:"
echo "docker compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot -d toynbeehall.org.uk -d www.toynbeehall.org.uk"
echo "docker compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot -d explore.toynbeehall.org.uk"

echo "Starting services..."
docker compose up -d

echo "Server initialization complete!"
