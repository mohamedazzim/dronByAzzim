# 🚀 SkyVision Pro - Production Deployment Guide

This guide will help you deploy the SkyVision Pro drone booking application to production.

## 📋 Prerequisites

### System Requirements
- **Node.js**: 18.x or higher
- **MySQL**: 8.0 or higher
- **PM2**: For process management (optional but recommended)
- **Nginx**: For reverse proxy (optional but recommended)
- **SSL Certificate**: For HTTPS (required for production)

### Server Requirements
- **CPU**: 2+ cores
- **RAM**: 4GB+ 
- **Storage**: 20GB+ SSD
- **OS**: Ubuntu 20.04+ / CentOS 8+ / Windows Server 2019+

## 🛠️ Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/skyvision-pro.git
cd skyvision-pro
```

### 2. Run Production Setup Script
```bash
node scripts/setup-production.js
```

This script will:
- ✅ Check prerequisites
- ✅ Set up environment configuration
- ✅ Install dependencies
- ✅ Set up database
- ✅ Configure security
- ✅ Set up monitoring
- ✅ Generate production config
- ✅ Run tests
- ✅ Create deployment scripts

### 3. Configure Environment Variables

Copy the example environment file and configure it:
```bash
cp env.example .env.local
```

Edit `.env.local` with your production values:
```env
# Database Configuration
DB_HOST=your-database-host
DB_USERNAME=your-database-user
DB_PASSWORD=your-secure-password
DB_DATABASE=drone_booking
DB_PORT=3306

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production-2024
NEXTAUTH_SECRET=your-nextauth-secret-key-change-in-production
NEXTAUTH_URL=https://your-domain.com

# Payment (Razorpay)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@your-domain.com

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Environment
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 4. Set Up Database

#### Option A: Using the Setup Script
```bash
mysql -u root -p < scripts/database-setup.sql
```

#### Option B: Manual Setup
```sql
-- Create database
CREATE DATABASE drone_booking;
USE drone_booking;

-- Run migrations
SOURCE database/migrations/001_authentication_tables.sql;
SOURCE database/migrations/002_enhanced_backend_tables.sql;
SOURCE database/migrations/003_payment_system_tables.sql;

-- Insert initial data
INSERT INTO services (name, description, price_per_hour, icon, status) VALUES
('Drone for Videography', 'Professional aerial videography for events, real estate, and commercial projects', 150.00, 'video', 'active'),
('Drone for Photoshoot', 'High-quality aerial photography for weddings, portraits, and landscapes', 120.00, 'camera', 'active'),
('Drone for Agriculture', 'Crop monitoring, field mapping, and precision agriculture services', 200.00, 'wheat', 'active'),
('Drone for Surveillance', 'Security monitoring and surveillance for properties and events', 180.00, 'shield', 'active'),
('Drone for Inspection', 'Infrastructure inspection for buildings, towers, and industrial facilities', 220.00, 'search', 'active'),
('Drone for Custom Needs', 'Customized drone services tailored to your specific requirements', 175.00, 'settings', 'active');
```

### 5. Install Dependencies
```bash
pnpm install
```

### 6. Build the Application
```bash
pnpm build
```

### 7. Start the Application

#### Option A: Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup
```

#### Option B: Using Node.js directly
```bash
NODE_ENV=production pnpm start
```

#### Option C: Using Docker
```bash
# Build Docker image
docker build -t skyvision-pro .

# Run container
docker run -d \
  --name skyvision-pro \
  -p 3000:3000 \
  --env-file .env.local \
  skyvision-pro
```

## 🌐 Web Server Configuration

### Nginx Configuration
Create `/etc/nginx/sites-available/skyvision-pro`:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Configuration
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;

    # Proxy to Node.js application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files caching
    location /_next/static/ {
        alias /path/to/your/app/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Health check endpoint
    location /api/health {
        proxy_pass http://localhost:3000;
        access_log off;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/skyvision-pro /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 Security Configuration

### 1. Firewall Setup
```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 2. SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 3. Database Security
```sql
-- Create dedicated user
CREATE USER 'skyvision_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON drone_booking.* TO 'skyvision_user'@'localhost';
FLUSH PRIVILEGES;
```

## 📊 Monitoring & Logging

### 1. Application Logs
```bash
# View PM2 logs
pm2 logs skyvision-pro

# View application logs
tail -f logs/app.log
```

### 2. System Monitoring
```bash
# Install monitoring tools
sudo apt install htop iotop nethogs

# Monitor system resources
htop
```

### 3. Database Monitoring
```sql
-- Check database status
SHOW STATUS LIKE 'Connections';
SHOW STATUS LIKE 'Threads_connected';
SHOW PROCESSLIST;
```

## 🔄 Deployment Process

### Automated Deployment
```bash
# Run deployment script
./deploy.sh
```

### Manual Deployment
```bash
# Pull latest changes
git pull origin main

# Install dependencies
pnpm install

# Build application
pnpm build

# Restart application
pm2 restart skyvision-pro
```

## 🧪 Testing

### Run Test Suite
```bash
node scripts/test-suite.js
```

### Health Check
```bash
curl https://your-domain.com/api/health
```

### Load Testing
```bash
# Install Apache Bench
sudo apt install apache2-utils

# Run load test
ab -n 1000 -c 10 https://your-domain.com/
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Application Won't Start
```bash
# Check logs
pm2 logs skyvision-pro

# Check environment variables
cat .env.local

# Check port availability
netstat -tulpn | grep :3000
```

#### 2. Database Connection Issues
```bash
# Test database connection
mysql -u skyvision_user -p -h localhost drone_booking

# Check MySQL status
sudo systemctl status mysql
```

#### 3. SSL Certificate Issues
```bash
# Check certificate validity
sudo certbot certificates

# Renew certificate manually
sudo certbot renew
```

#### 4. Performance Issues
```bash
# Check system resources
htop
df -h
free -h

# Check application performance
pm2 monit
```

## 📈 Performance Optimization

### 1. Database Optimization
```sql
-- Add indexes for better performance
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
```

### 2. Caching
```bash
# Install Redis
sudo apt install redis-server

# Configure Redis in your application
# Add to .env.local:
REDIS_URL=redis://localhost:6379
```

### 3. CDN Setup
- Configure Cloudflare or similar CDN
- Set up image optimization
- Enable caching for static assets

## 🔄 Backup Strategy

### 1. Database Backup
```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u skyvision_user -p drone_booking > backup_$DATE.sql
gzip backup_$DATE.sql
```

### 2. Application Backup
```bash
# Backup application files
tar -czf app_backup_$(date +%Y%m%d).tar.gz /path/to/your/app
```

### 3. Automated Backups
```bash
# Add to crontab
0 2 * * * /path/to/backup-script.sh
```

## 📞 Support

For support and issues:
- 📧 Email: support@skyvisionpro.com
- 📱 Phone: +1-555-0123
- 🌐 Website: https://skyvisionpro.com/support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy Flying! 🚁✨** 