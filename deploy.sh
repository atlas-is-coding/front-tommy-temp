#!/bin/bash

# Tommy Horne Frontend Deployment Script
# This script deploys the frontend to a VPS server with nginx and SSL

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration variables
PROJECT_NAME="tommy-horne-front"
NGINX_SITES_AVAILABLE="/etc/nginx/sites-available"
NGINX_SITES_ENABLED="/etc/nginx/sites-enabled"
WEB_ROOT="/var/www/$PROJECT_NAME"
SERVICE_NAME="tommy-horne-front"
DOMAIN=""
EMAIL=""
BACKUP_DIR="/var/backups/$PROJECT_NAME"

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

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Tommy Horne Frontend Deploy  ${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Function to check if running as root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        print_error "This script must be run as root (use sudo)"
        exit 1
    fi
}

# Function to get user input
get_user_input() {
    if [[ -z "$DOMAIN" ]]; then
        read -p "Enter your domain name (e.g., example.com): " DOMAIN
    fi
    
    if [[ -z "$EMAIL" ]]; then
        read -p "Enter your email address for Let's Encrypt: " EMAIL
    fi
}

# Function to update system packages
update_system() {
    print_status "Updating system packages..."
    apt update && apt upgrade -y
    print_status "System updated successfully"
}

# Function to install required packages
install_dependencies() {
    print_status "Installing required packages..."
    
    # Install nginx, certbot, and other dependencies
    apt install -y nginx certbot python3-certbot-nginx ufw curl wget unzip git
    
    # Enable and start nginx
    systemctl enable nginx
    systemctl start nginx
    
    print_status "Dependencies installed successfully"
}

# Function to create project directory structure
create_directories() {
    print_status "Creating directory structure..."
    
    # Create web root directory
    mkdir -p $WEB_ROOT
    mkdir -p $BACKUP_DIR
    mkdir -p /var/log/$PROJECT_NAME
    
    # Set proper permissions
    chown -R www-data:www-data $WEB_ROOT
    chmod -R 755 $WEB_ROOT
    
    print_status "Directory structure created"
}

# Function to backup existing deployment
backup_existing() {
    if [[ -d "$WEB_ROOT" && "$(ls -A $WEB_ROOT)" ]]; then
        print_status "Creating backup of existing deployment..."
        
        BACKUP_FILE="$BACKUP_DIR/backup-$(date +%Y%m%d-%H%M%S).tar.gz"
        tar -czf "$BACKUP_FILE" -C /var/www "$PROJECT_NAME"
        
        print_status "Backup created: $BACKUP_FILE"
    fi
}

# Function to deploy frontend files
deploy_files() {
    print_status "Deploying frontend files..."
    
    # Get the directory where this script is located
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    
    # Copy all files to web root
    cp -r "$SCRIPT_DIR"/* "$WEB_ROOT/"
    
    # Set proper ownership and permissions
    chown -R www-data:www-data $WEB_ROOT
    chmod -R 755 $WEB_ROOT
    
    # Make sure index.html is readable
    chmod 644 "$WEB_ROOT/index.html"
    
    print_status "Frontend files deployed successfully"
}

# Function to configure nginx
configure_nginx() {
    print_status "Configuring nginx..."
    
    # Copy nginx configuration
    cp "$WEB_ROOT/nginx.conf" "$NGINX_SITES_AVAILABLE/$PROJECT_NAME"
    
    # Replace domain placeholder
    sed -i "s/YOUR_DOMAIN.com/$DOMAIN/g" "$NGINX_SITES_AVAILABLE/$PROJECT_NAME"
    
    # Remove default nginx site if it exists
    if [[ -f "$NGINX_SITES_ENABLED/default" ]]; then
        rm "$NGINX_SITES_ENABLED/default"
    fi
    
    # Enable the site
    ln -sf "$NGINX_SITES_AVAILABLE/$PROJECT_NAME" "$NGINX_SITES_ENABLED/"
    
    # Test nginx configuration
    nginx -t
    
    if [[ $? -eq 0 ]]; then
        print_status "Nginx configuration is valid"
    else
        print_error "Nginx configuration test failed"
        exit 1
    fi
}

# Function to setup SSL certificate
setup_ssl() {
    print_status "Setting up SSL certificate..."
    
    # Create webroot for Let's Encrypt
    mkdir -p /var/www/html
    
    # Stop nginx temporarily
    systemctl stop nginx
    
    # Obtain SSL certificate
    certbot certonly \
        --webroot \
        --webroot-path=/var/www/html \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        --domains $DOMAIN,www.$DOMAIN \
        --non-interactive
    
    if [[ $? -eq 0 ]]; then
        print_status "SSL certificate obtained successfully"
    else
        print_warning "SSL certificate setup failed, continuing with HTTP only"
    fi
    
    # Start nginx
    systemctl start nginx
}

# Function to configure firewall
configure_firewall() {
    print_status "Configuring firewall..."
    
    # Enable UFW if not already enabled
    ufw --force enable
    
    # Allow SSH, HTTP, and HTTPS
    ufw allow ssh
    ufw allow 80/tcp
    ufw allow 443/tcp
    
    # Reload firewall
    ufw reload
    
    print_status "Firewall configured successfully"
}

# Function to setup log rotation
setup_log_rotation() {
    print_status "Setting up log rotation..."
    
    cat > "/etc/logrotate.d/$PROJECT_NAME" << EOF
/var/log/$PROJECT_NAME/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        systemctl reload nginx
    endscript
}
EOF
    
    print_status "Log rotation configured"
}

# Function to create systemd service
create_systemd_service() {
    print_status "Creating systemd service..."
    
    cat > "/etc/systemd/system/$SERVICE_NAME.service" << EOF
[Unit]
Description=Tommy Horne Frontend
After=network.target nginx.service

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/bin/true
ExecReload=/bin/true

[Install]
WantedBy=multi-user.target
EOF
    
    # Enable the service
    systemctl enable $SERVICE_NAME
    
    print_status "Systemd service created and enabled"
}

# Function to setup monitoring
setup_monitoring() {
    print_status "Setting up basic monitoring..."
    
    # Create health check script
    cat > "/usr/local/bin/$PROJECT_NAME-health.sh" << 'EOF'
#!/bin/bash
# Health check script for Tommy Horne Frontend

DOMAIN="YOUR_DOMAIN"
LOG_FILE="/var/log/tommy-horne-front/health.log"

# Check if nginx is running
if ! systemctl is-active --quiet nginx; then
    echo "$(date): Nginx is not running" >> $LOG_FILE
    systemctl restart nginx
fi

# Check if website is accessible
if ! curl -f -s "https://$DOMAIN/health" > /dev/null; then
    echo "$(date): Website health check failed" >> $LOG_FILE
fi
EOF
    
    # Replace domain in health check script
    sed -i "s/YOUR_DOMAIN/$DOMAIN/g" "/usr/local/bin/$PROJECT_NAME-health.sh"
    
    # Make script executable
    chmod +x "/usr/local/bin/$PROJECT_NAME-health.sh"
    
    # Add to crontab for regular health checks
    (crontab -l 2>/dev/null; echo "*/5 * * * * /usr/local/bin/$PROJECT_NAME-health.sh") | crontab -
    
    print_status "Monitoring setup completed"
}

# Function to restart services
restart_services() {
    print_status "Restarting services..."
    
    # Reload nginx
    systemctl reload nginx
    
    # Restart the service
    systemctl restart $SERVICE_NAME
    
    print_status "Services restarted successfully"
}

# Function to display deployment summary
show_summary() {
    print_header
    print_status "Deployment completed successfully!"
    echo
    print_status "Deployment Summary:"
    echo "  - Domain: $DOMAIN"
    echo "  - Web Root: $WEB_ROOT"
    echo "  - Nginx Config: $NGINX_SITES_AVAILABLE/$PROJECT_NAME"
    echo "  - Service: $SERVICE_NAME"
    echo "  - Logs: /var/log/$PROJECT_NAME/"
    echo "  - Backups: $BACKUP_DIR"
    echo
    print_status "Next Steps:"
    echo "  1. Update your DNS to point $DOMAIN to this server's IP"
    echo "  2. Wait for DNS propagation (usually 5-15 minutes)"
    echo "  3. Test your website: https://$DOMAIN"
    echo "  4. Check SSL certificate: https://www.ssllabs.com/ssltest/"
    echo
    print_status "Useful Commands:"
    echo "  - Check nginx status: systemctl status nginx"
    echo "  - Check nginx logs: journalctl -u nginx -f"
    echo "  - Test nginx config: nginx -t"
    echo "  - Reload nginx: systemctl reload nginx"
    echo "  - Check SSL renewal: certbot renew --dry-run"
    echo
}

# Function to cleanup temporary files
cleanup() {
    print_status "Cleaning up temporary files..."
    # Remove any temporary files if needed
    print_status "Cleanup completed"
}

# Main deployment function
main() {
    print_header
    
    check_root
    get_user_input
    update_system
    install_dependencies
    create_directories
    backup_existing
    deploy_files
    configure_nginx
    setup_ssl
    configure_firewall
    setup_log_rotation
    create_systemd_service
    setup_monitoring
    restart_services
    cleanup
    show_summary
}

# Handle script arguments
case "${1:-}" in
    --help|-h)
        echo "Usage: $0 [options]"
        echo "Options:"
        echo "  --help, -h     Show this help message"
        echo "  --domain DOMAIN    Set domain name"
        echo "  --email EMAIL      Set email for Let's Encrypt"
        echo
        echo "Example:"
        echo "  $0 --domain example.com --email admin@example.com"
        exit 0
        ;;
    --domain)
        DOMAIN="$2"
        shift 2
        ;;
    --email)
        EMAIL="$2"
        shift 2
        ;;
esac

# Run main function
main "$@"
