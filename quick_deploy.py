#!/usr/bin/env python3
"""
Quick Deploy Script for Tommy Horne Frontend
Simplified version for quick deployment
"""

import os
import sys
import subprocess
import argparse
from pathlib import Path

def run_command(command, check=True):
    """Run shell command"""
    print(f"Running: {command}")
    result = subprocess.run(command, shell=True, check=check, capture_output=True, text=True)
    if result.stdout:
        print(result.stdout)
    if result.stderr:
        print(f"Error: {result.stderr}")
    return result

def main():
    parser = argparse.ArgumentParser(description="Quick Deploy for Tommy Horne Frontend")
    parser.add_argument("--domain", "-d", required=True, help="Domain name (e.g., synaptrixtools.com)")
    parser.add_argument("--email", "-e", required=True, help="Email for Let's Encrypt")
    parser.add_argument("--no-ssl", action="store_true", help="Skip SSL setup")
    
    args = parser.parse_args()
    
    print("🚀 Starting Quick Deploy...")
    
    # Check if running as root
    if os.geteuid() != 0:
        print("❌ This script must be run as root (use sudo)")
        sys.exit(1)
    
    try:
        # Update system
        print("📦 Updating system...")
        run_command("apt update && apt upgrade -y")
        
        # Install dependencies
        print("🔧 Installing dependencies...")
        run_command("apt install -y nginx certbot python3-certbot-nginx ufw curl wget")
        
        # Create directories
        print("📁 Creating directories...")
        run_command("mkdir -p /var/www/tommy-horne-front /var/backups/tommy-horne-front /var/log/tommy-horne-front")
        run_command("chown -R www-data:www-data /var/www/tommy-horne-front")
        
        # Deploy files
        print("📄 Deploying files...")
        script_dir = Path(__file__).parent
        run_command(f"cp -r {script_dir}/* /var/www/tommy-horne-front/")
        run_command("chown -R www-data:www-data /var/www/tommy-horne-front")
        
        # Configure nginx
        print("⚙️ Configuring nginx...")
        run_command(f"cp {script_dir}/nginx.conf /etc/nginx/sites-available/tommy-horne-front")
        run_command(f"sed -i 's/YOUR_DOMAIN.com/{args.domain}/g' /etc/nginx/sites-available/tommy-horne-front")
        run_command("rm -f /etc/nginx/sites-enabled/default")
        run_command("ln -sf /etc/nginx/sites-available/tommy-horne-front /etc/nginx/sites-enabled/")
        
        # Test nginx config
        print("🧪 Testing nginx configuration...")
        run_command("nginx -t")
        
        # Setup SSL if not disabled
        if not args.no_ssl:
            print("🔒 Setting up SSL...")
            run_command("systemctl stop nginx")
            run_command(f"certbot certonly --webroot --webroot-path=/var/www/html --email {args.email} --agree-tos --no-eff-email --domains {args.domain},www.{args.domain} --non-interactive")
            run_command("systemctl start nginx")
        
        # Configure firewall
        print("🔥 Configuring firewall...")
        run_command("ufw --force enable")
        run_command("ufw allow ssh")
        run_command("ufw allow 80/tcp")
        run_command("ufw allow 443/tcp")
        
        # Start services
        print("🚀 Starting services...")
        run_command("systemctl enable nginx")
        run_command("systemctl restart nginx")
        
        print("✅ Deployment completed successfully!")
        print(f"🌐 Your site should be available at: https://{args.domain}")
        print("📋 Next steps:")
        print("   1. Update DNS to point to this server")
        print("   2. Wait for DNS propagation")
        print("   3. Test your website")
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Deployment failed: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("⚠️ Deployment interrupted by user")
        sys.exit(1)

if __name__ == "__main__":
    main()
