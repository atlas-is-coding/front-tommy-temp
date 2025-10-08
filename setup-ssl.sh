#!/bin/bash

# SSL Certificate Setup Script for Tommy Horne Frontend
# This script sets up Let's Encrypt SSL certificate

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOMAIN=""
EMAIL=""
WEBROOT="/var/www/html"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if running as root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        print_error "This script must be run as root (use sudo)"
        exit 1
    fi
}

# Function to get domain and email from user
get_user_input() {
    if [[ -z "$DOMAIN" ]]; then
        read -p "Enter your domain name (e.g., example.com): " DOMAIN
    fi
    
    if [[ -z "$EMAIL" ]]; then
        read -p "Enter your email address for Let's Encrypt: " EMAIL
    fi
}

# Function to install certbot
install_certbot() {
    print_status "Installing certbot..."
    
    # Update package list
    apt update
    
    # Install certbot and nginx plugin
    apt install -y certbot python3-certbot-nginx
    
    print_status "Certbot installed successfully"
}

# Function to create webroot directory
create_webroot() {
    print_status "Creating webroot directory..."
    mkdir -p $WEBROOT
    chown -R www-data:www-data $WEBROOT
    chmod -R 755 $WEBROOT
}

# Function to obtain SSL certificate
obtain_certificate() {
    print_status "Obtaining SSL certificate for $DOMAIN..."
    
    # Stop nginx if running
    systemctl stop nginx 2>/dev/null || true
    
    # Obtain certificate using webroot method
    certbot certonly \
        --webroot \
        --webroot-path=$WEBROOT \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        --domains $DOMAIN,www.$DOMAIN
    
    if [[ $? -eq 0 ]]; then
        print_status "SSL certificate obtained successfully!"
    else
        print_error "Failed to obtain SSL certificate"
        exit 1
    fi
}

# Function to setup auto-renewal
setup_auto_renewal() {
    print_status "Setting up automatic certificate renewal..."
    
    # Create renewal script
    cat > /etc/cron.d/certbot-renew << EOF
# Renew Let's Encrypt certificates twice daily
0 12 * * * root certbot renew --quiet --post-hook "systemctl reload nginx"
0 0 * * * root certbot renew --quiet --post-hook "systemctl reload nginx"
EOF
    
    # Test renewal
    certbot renew --dry-run
    
    print_status "Auto-renewal configured successfully"
}

# Function to update nginx config with domain
update_nginx_config() {
    print_status "Updating nginx configuration with domain name..."
    
    # Replace placeholder domain in nginx config
    sed -i "s/YOUR_DOMAIN.com/$DOMAIN/g" /etc/nginx/sites-available/tommy-horne-front
    
    print_status "Nginx configuration updated"
}

# Main execution
main() {
    print_status "Starting SSL certificate setup..."
    
    check_root
    get_user_input
    install_certbot
    create_webroot
    obtain_certificate
    setup_auto_renewal
    update_nginx_config
    
    print_status "SSL setup completed successfully!"
    print_warning "Don't forget to:"
    print_warning "1. Update your domain DNS to point to this server"
    print_warning "2. Copy the nginx configuration to /etc/nginx/sites-available/"
    print_warning "3. Enable the site and restart nginx"
}

# Run main function
main "$@"
