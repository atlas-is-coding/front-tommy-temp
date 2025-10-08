#!/usr/bin/env python3
"""
Tommy Horne Frontend Deployment Script
Python wrapper for automated VPS deployment with nginx and SSL
"""

import os
import sys
import json
import subprocess
import argparse
import logging
from pathlib import Path
from typing import Dict, List, Optional
import shutil
import time
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('deploy.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

class Colors:
    """ANSI color codes for terminal output"""
    RED = '\033[0;31m'
    GREEN = '\033[0;32m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    PURPLE = '\033[0;35m'
    CYAN = '\033[0;36m'
    WHITE = '\033[1;37m'
    NC = '\033[0m'  # No Color

class Deployer:
    """Main deployment class"""
    
    def __init__(self, config_file: str = "deploy_config.json"):
        self.config_file = config_file
        self.config = self.load_config()
        self.project_name = "tommy-horne-front"
        self.nginx_sites_available = "/etc/nginx/sites-available"
        self.nginx_sites_enabled = "/etc/nginx/sites-enabled"
        self.web_root = f"/var/www/{self.project_name}"
        self.backup_dir = f"/var/backups/{self.project_name}"
        
    def load_config(self) -> Dict:
        """Load configuration from JSON file"""
        default_config = {
            "domain": "",
            "email": "",
            "server_ip": "",
            "ssh_user": "root",
            "ssh_key": "",
            "nginx_config": "nginx.conf",
            "service_name": "tommy-horne-front",
            "backup_enabled": True,
            "ssl_enabled": True,
            "firewall_enabled": True,
            "monitoring_enabled": True,
            "log_rotation_enabled": True
        }
        
        if os.path.exists(self.config_file):
            try:
                with open(self.config_file, 'r') as f:
                    config = json.load(f)
                # Merge with defaults
                for key, value in default_config.items():
                    if key not in config:
                        config[key] = value
                return config
            except Exception as e:
                logger.error(f"Error loading config file: {e}")
                return default_config
        else:
            # Create default config file
            self.save_config(default_config)
            return default_config
    
    def save_config(self, config: Dict) -> None:
        """Save configuration to JSON file"""
        try:
            with open(self.config_file, 'w') as f:
                json.dump(config, f, indent=4)
            logger.info(f"Configuration saved to {self.config_file}")
        except Exception as e:
            logger.error(f"Error saving config: {e}")
    
    def print_header(self) -> None:
        """Print deployment header"""
        print(f"{Colors.BLUE}{'='*50}{Colors.NC}")
        print(f"{Colors.BLUE}  Tommy Horne Frontend Deployer  {Colors.NC}")
        print(f"{Colors.BLUE}{'='*50}{Colors.NC}")
    
    def print_status(self, message: str) -> None:
        """Print status message"""
        print(f"{Colors.GREEN}[INFO]{Colors.NC} {message}")
        logger.info(message)
    
    def print_warning(self, message: str) -> None:
        """Print warning message"""
        print(f"{Colors.YELLOW}[WARNING]{Colors.NC} {message}")
        logger.warning(message)
    
    def print_error(self, message: str) -> None:
        """Print error message"""
        print(f"{Colors.RED}[ERROR]{Colors.NC} {message}")
        logger.error(message)
    
    def run_command(self, command: str, check: bool = True, shell: bool = True) -> subprocess.CompletedProcess:
        """Run shell command with error handling"""
        try:
            logger.info(f"Running command: {command}")
            result = subprocess.run(
                command, 
                shell=shell, 
                check=check, 
                capture_output=True, 
                text=True
            )
            if result.stdout:
                logger.debug(f"STDOUT: {result.stdout}")
            if result.stderr:
                logger.debug(f"STDERR: {result.stderr}")
            return result
        except subprocess.CalledProcessError as e:
            self.print_error(f"Command failed: {command}")
            self.print_error(f"Error: {e.stderr}")
            raise
    
    def check_root(self) -> None:
        """Check if running as root"""
        if os.geteuid() != 0:
            self.print_error("This script must be run as root (use sudo)")
            sys.exit(1)
    
    def get_user_input(self) -> None:
        """Get user input for configuration"""
        if not self.config.get("domain"):
            domain = input("Enter your domain name (e.g., synaptrixtools.com): ").strip()
            self.config["domain"] = domain
        
        if not self.config.get("email"):
            email = input("Enter your email address for Let's Encrypt: ").strip()
            self.config["email"] = email
        
        if not self.config.get("server_ip"):
            server_ip = input("Enter your server IP address: ").strip()
            self.config["server_ip"] = server_ip
        
        self.save_config(self.config)
    
    def update_system(self) -> None:
        """Update system packages"""
        self.print_status("Updating system packages...")
        self.run_command("apt update && apt upgrade -y")
        self.print_status("System updated successfully")
    
    def install_dependencies(self) -> None:
        """Install required packages"""
        self.print_status("Installing required packages...")
        
        packages = [
            "nginx", "certbot", "python3-certbot-nginx", 
            "ufw", "curl", "wget", "unzip", "git", "htop"
        ]
        
        for package in packages:
            self.run_command(f"apt install -y {package}")
        
        # Enable and start nginx
        self.run_command("systemctl enable nginx")
        self.run_command("systemctl start nginx")
        
        self.print_status("Dependencies installed successfully")
    
    def create_directories(self) -> None:
        """Create project directory structure"""
        self.print_status("Creating directory structure...")
        
        directories = [
            self.web_root,
            self.backup_dir,
            f"/var/log/{self.project_name}",
            "/var/www/html"  # For Let's Encrypt
        ]
        
        for directory in directories:
            os.makedirs(directory, exist_ok=True)
            self.run_command(f"chown -R www-data:www-data {directory}")
            self.run_command(f"chmod -R 755 {directory}")
        
        self.print_status("Directory structure created")
    
    def backup_existing(self) -> None:
        """Backup existing deployment"""
        if os.path.exists(self.web_root) and os.listdir(self.web_root):
            self.print_status("Creating backup of existing deployment...")
            
            timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
            backup_file = f"{self.backup_dir}/backup-{timestamp}.tar.gz"
            
            self.run_command(f"tar -czf {backup_file} -C /var/www {self.project_name}")
            self.print_status(f"Backup created: {backup_file}")
    
    def deploy_files(self) -> None:
        """Deploy frontend files"""
        self.print_status("Deploying frontend files...")
        
        # Get current script directory
        script_dir = Path(__file__).parent.absolute()
        
        # Files to copy (exclude Python files and config)
        exclude_files = {
            'deploy.py', 'deploy_config.json', 'requirements.txt', 
            'deploy.log', '__pycache__', '.git'
        }
        
        for item in script_dir.iterdir():
            if item.name not in exclude_files and not item.name.startswith('.'):
                dest_path = Path(self.web_root) / item.name
                if item.is_file():
                    shutil.copy2(item, dest_path)
                elif item.is_dir():
                    if dest_path.exists():
                        shutil.rmtree(dest_path)
                    shutil.copytree(item, dest_path)
        
        # Set proper ownership and permissions
        self.run_command(f"chown -R www-data:www-data {self.web_root}")
        self.run_command(f"chmod -R 755 {self.web_root}")
        self.run_command(f"chmod 644 {self.web_root}/index.html")
        
        self.print_status("Frontend files deployed successfully")
    
    def configure_nginx(self) -> None:
        """Configure nginx"""
        self.print_status("Configuring nginx...")
        
        # Copy nginx configuration
        nginx_config_path = f"{self.nginx_sites_available}/{self.project_name}"
        shutil.copy2("nginx.conf", nginx_config_path)
        
        # Replace domain placeholder
        with open(nginx_config_path, 'r') as f:
            content = f.read()
        
        content = content.replace("YOUR_DOMAIN.com", self.config["domain"])
        
        with open(nginx_config_path, 'w') as f:
            f.write(content)
        
        # Remove default nginx site
        default_site = f"{self.nginx_sites_enabled}/default"
        if os.path.exists(default_site):
            os.remove(default_site)
        
        # Enable the site
        enabled_site = f"{self.nginx_sites_enabled}/{self.project_name}"
        if os.path.exists(enabled_site):
            os.remove(enabled_site)
        os.symlink(nginx_config_path, enabled_site)
        
        # Test nginx configuration
        result = self.run_command("nginx -t", check=False)
        if result.returncode == 0:
            self.print_status("Nginx configuration is valid")
        else:
            self.print_error("Nginx configuration test failed")
            raise Exception("Nginx configuration is invalid")
    
    def setup_ssl(self) -> None:
        """Setup SSL certificate"""
        if not self.config.get("ssl_enabled", True):
            self.print_warning("SSL setup disabled in configuration")
            return
        
        self.print_status("Setting up SSL certificate...")
        
        # Stop nginx temporarily
        self.run_command("systemctl stop nginx", check=False)
        
        try:
            # Obtain SSL certificate
            cert_command = [
                "certbot", "certonly",
                "--webroot",
                "--webroot-path=/var/www/html",
                "--email", self.config["email"],
                "--agree-tos",
                "--no-eff-email",
                "--domains", f"{self.config['domain']},www.{self.config['domain']}",
                "--non-interactive"
            ]
            
            self.run_command(" ".join(cert_command))
            self.print_status("SSL certificate obtained successfully")
            
        except subprocess.CalledProcessError:
            self.print_warning("SSL certificate setup failed, continuing with HTTP only")
        finally:
            # Start nginx
            self.run_command("systemctl start nginx")
    
    def configure_firewall(self) -> None:
        """Configure firewall"""
        if not self.config.get("firewall_enabled", True):
            self.print_warning("Firewall configuration disabled")
            return
        
        self.print_status("Configuring firewall...")
        
        # Enable UFW
        self.run_command("ufw --force enable")
        
        # Allow necessary ports
        ports = ["ssh", "80/tcp", "443/tcp"]
        for port in ports:
            self.run_command(f"ufw allow {port}")
        
        # Reload firewall
        self.run_command("ufw reload")
        
        self.print_status("Firewall configured successfully")
    
    def setup_log_rotation(self) -> None:
        """Setup log rotation"""
        if not self.config.get("log_rotation_enabled", True):
            self.print_warning("Log rotation disabled")
            return
        
        self.print_status("Setting up log rotation...")
        
        logrotate_config = f"""/var/log/{self.project_name}/*.log {{
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
}}"""
        
        with open(f"/etc/logrotate.d/{self.project_name}", 'w') as f:
            f.write(logrotate_config)
        
        self.print_status("Log rotation configured")
    
    def create_systemd_service(self) -> None:
        """Create systemd service"""
        self.print_status("Creating systemd service...")
        
        service_content = f"""[Unit]
Description=Tommy Horne Frontend Service
Documentation=https://github.com/your-username/tommy-horne-front
After=network.target nginx.service
Wants=nginx.service

[Service]
Type=oneshot
RemainAfterExit=yes
User=www-data
Group=www-data
WorkingDirectory={self.web_root}
ExecStart=/bin/true
ExecReload=/bin/true
ExecStop=/bin/true
StandardOutput=journal
StandardError=journal
SyslogIdentifier={self.project_name}

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths={self.web_root} /var/log/{self.project_name}

# Restart policy
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target"""
        
        with open(f"/etc/systemd/system/{self.project_name}.service", 'w') as f:
            f.write(service_content)
        
        # Enable the service
        self.run_command(f"systemctl enable {self.project_name}")
        
        self.print_status("Systemd service created and enabled")
    
    def setup_monitoring(self) -> None:
        """Setup monitoring"""
        if not self.config.get("monitoring_enabled", True):
            self.print_warning("Monitoring disabled")
            return
        
        self.print_status("Setting up monitoring...")
        
        health_script = f"""#!/bin/bash
# Health check script for Tommy Horne Frontend

DOMAIN="{self.config['domain']}"
LOG_FILE="/var/log/{self.project_name}/health.log"

# Check if nginx is running
if ! systemctl is-active --quiet nginx; then
    echo "$(date): Nginx is not running" >> $LOG_FILE
    systemctl restart nginx
fi

# Check if website is accessible
if ! curl -f -s "https://$DOMAIN/health" > /dev/null; then
    echo "$(date): Website health check failed" >> $LOG_FILE
fi"""
        
        health_script_path = f"/usr/local/bin/{self.project_name}-health.sh"
        with open(health_script_path, 'w') as f:
            f.write(health_script)
        
        # Make script executable
        self.run_command(f"chmod +x {health_script_path}")
        
        # Add to crontab
        cron_entry = f"*/5 * * * * {health_script_path}"
        try:
            # Get current crontab
            result = self.run_command("crontab -l", check=False)
            current_crontab = result.stdout if result.returncode == 0 else ""
            
            # Add new entry if not exists
            if cron_entry not in current_crontab:
                new_crontab = current_crontab + f"\n{cron_entry}\n"
                with open("/tmp/crontab", 'w') as f:
                    f.write(new_crontab)
                self.run_command("crontab /tmp/crontab")
                os.remove("/tmp/crontab")
        
        except Exception as e:
            self.print_warning(f"Could not setup cron job: {e}")
        
        self.print_status("Monitoring setup completed")
    
    def restart_services(self) -> None:
        """Restart services"""
        self.print_status("Restarting services...")
        
        self.run_command("systemctl reload nginx")
        self.run_command(f"systemctl restart {self.project_name}")
        
        self.print_status("Services restarted successfully")
    
    def show_summary(self) -> None:
        """Show deployment summary"""
        self.print_header()
        self.print_status("Deployment completed successfully!")
        print()
        self.print_status("Deployment Summary:")
        print(f"  - Domain: {self.config['domain']}")
        print(f"  - Web Root: {self.web_root}")
        print(f"  - Nginx Config: {self.nginx_sites_available}/{self.project_name}")
        print(f"  - Service: {self.project_name}")
        print(f"  - Logs: /var/log/{self.project_name}/")
        print(f"  - Backups: {self.backup_dir}")
        print()
        self.print_status("Next Steps:")
        print(f"  1. Update your DNS to point {self.config['domain']} to this server's IP")
        print("  2. Wait for DNS propagation (usually 5-15 minutes)")
        print(f"  3. Test your website: https://{self.config['domain']}")
        print("  4. Check SSL certificate: https://www.ssllabs.com/ssltest/")
        print()
        self.print_status("Useful Commands:")
        print(f"  - Check nginx status: systemctl status nginx")
        print(f"  - Check nginx logs: journalctl -u nginx -f")
        print("  - Test nginx config: nginx -t")
        print("  - Reload nginx: systemctl reload nginx")
        print("  - Check SSL renewal: certbot renew --dry-run")
        print()
    
    def deploy(self) -> None:
        """Main deployment function"""
        self.print_header()
        
        self.check_root()
        self.get_user_input()
        self.update_system()
        self.install_dependencies()
        self.create_directories()
        self.backup_existing()
        self.deploy_files()
        self.configure_nginx()
        self.setup_ssl()
        self.configure_firewall()
        self.setup_log_rotation()
        self.create_systemd_service()
        self.setup_monitoring()
        self.restart_services()
        self.show_summary()

def main():
    """Main function"""
    parser = argparse.ArgumentParser(description="Tommy Horne Frontend Deployment Script")
    parser.add_argument("--config", "-c", default="deploy_config.json", 
                       help="Configuration file path")
    parser.add_argument("--domain", "-d", help="Domain name")
    parser.add_argument("--email", "-e", help="Email for Let's Encrypt")
    parser.add_argument("--server-ip", "-s", help="Server IP address")
    parser.add_argument("--no-ssl", action="store_true", help="Disable SSL setup")
    parser.add_argument("--no-firewall", action="store_true", help="Disable firewall setup")
    parser.add_argument("--no-monitoring", action="store_true", help="Disable monitoring setup")
    parser.add_argument("--no-backup", action="store_true", help="Disable backup creation")
    
    args = parser.parse_args()
    
    # Initialize deployer
    deployer = Deployer(args.config)
    
    # Override config with command line arguments
    if args.domain:
        deployer.config["domain"] = args.domain
    if args.email:
        deployer.config["email"] = args.email
    if args.server_ip:
        deployer.config["server_ip"] = args.server_ip
    if args.no_ssl:
        deployer.config["ssl_enabled"] = False
    if args.no_firewall:
        deployer.config["firewall_enabled"] = False
    if args.no_monitoring:
        deployer.config["monitoring_enabled"] = False
    if args.no_backup:
        deployer.config["backup_enabled"] = False
    
    # Save updated config
    deployer.save_config(deployer.config)
    
    # Run deployment
    try:
        deployer.deploy()
    except KeyboardInterrupt:
        deployer.print_warning("Deployment interrupted by user")
        sys.exit(1)
    except Exception as e:
        deployer.print_error(f"Deployment failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
