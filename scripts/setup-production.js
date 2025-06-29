#!/usr/bin/env node

/**
 * Production Setup Script for SkyVision Pro Drone Booking Application
 * This script sets up the application for production deployment
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class ProductionSetup {
  constructor() {
    this.rootDir = path.resolve(__dirname, '..')
    this.setupLog = []
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString()
    const logMessage = `[${timestamp}] ${type.toUpperCase()}: ${message}`
    console.log(logMessage)
    this.setupLog.push(logMessage)
  }

  async run() {
    this.log('Starting production setup for SkyVision Pro...')
    
    try {
      await this.checkPrerequisites()
      await this.setupEnvironment()
      await this.installDependencies()
      await this.setupDatabase()
      await this.setupSecurity()
      await this.setupMonitoring()
      await this.generateProductionConfig()
      await this.runTests()
      await this.createDeploymentScripts()
      
      this.log('Production setup completed successfully!', 'success')
      this.saveSetupLog()
      
    } catch (error) {
      this.log(`Setup failed: ${error.message}`, 'error')
      process.exit(1)
    }
  }

  async checkPrerequisites() {
    this.log('Checking prerequisites...')
    
    // Check Node.js version
    const nodeVersion = process.version
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0])
    if (majorVersion < 18) {
      throw new Error(`Node.js 18+ required. Current version: ${nodeVersion}`)
    }
    this.log(`Node.js version: ${nodeVersion}`)

    // Check npm/pnpm
    try {
      const pnpmVersion = execSync('pnpm --version', { encoding: 'utf8' }).trim()
      this.log(`pnpm version: ${pnpmVersion}`)
    } catch {
      this.log('pnpm not found, installing...')
      execSync('npm install -g pnpm', { stdio: 'inherit' })
    }

    // Check for required directories
    const requiredDirs = ['app', 'components', 'lib', 'backend', 'database']
    for (const dir of requiredDirs) {
      if (!fs.existsSync(path.join(this.rootDir, dir))) {
        throw new Error(`Required directory missing: ${dir}`)
      }
    }
    
    this.log('Prerequisites check passed')
  }

  async setupEnvironment() {
    this.log('Setting up environment configuration...')
    
    const envExamplePath = path.join(this.rootDir, 'env.example')
    const envLocalPath = path.join(this.rootDir, '.env.local')
    
    if (!fs.existsSync(envLocalPath)) {
      if (fs.existsSync(envExamplePath)) {
        fs.copyFileSync(envExamplePath, envLocalPath)
        this.log('Created .env.local from env.example')
      } else {
        this.log('Creating basic .env.local file...')
        const basicEnv = `# Database Configuration
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=drone_booking
DB_PORT=3306

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production-2024
NEXTAUTH_SECRET=your-nextauth-secret-key-change-in-production
NEXTAUTH_URL=http://localhost:3000

# Payment (Razorpay)
RAZORPAY_KEY_ID=rzp_test_Jnc1rwSBhtZKvq
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_Jnc1rwSBhtZKvq

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=noreply@skyvisionpro.com

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Environment
NODE_ENV=production
NEXT_PUBLIC_APP_URL=http://localhost:3000
`
        fs.writeFileSync(envLocalPath, basicEnv)
        this.log('Created basic .env.local file')
      }
    } else {
      this.log('.env.local already exists')
    }
  }

  async installDependencies() {
    this.log('Installing dependencies...')
    
    try {
      execSync('pnpm install', { stdio: 'inherit', cwd: this.rootDir })
      this.log('Dependencies installed successfully')
    } catch (error) {
      throw new Error(`Failed to install dependencies: ${error.message}`)
    }
  }

  async setupDatabase() {
    this.log('Setting up database...')
    
    const migrationsDir = path.join(this.rootDir, 'database', 'migrations')
    if (fs.existsSync(migrationsDir)) {
      this.log('Database migrations found')
      
      // Create database setup script
      const dbSetupScript = `-- Database Setup Script for SkyVision Pro
-- Run this script to set up the database

CREATE DATABASE IF NOT EXISTS drone_booking;
USE drone_booking;

-- Run migrations in order
SOURCE ${path.join(migrationsDir, '001_authentication_tables.sql')};
SOURCE ${path.join(migrationsDir, '002_enhanced_backend_tables.sql')};
SOURCE ${path.join(migrationsDir, '003_payment_system_tables.sql')};

-- Insert initial data
INSERT INTO services (name, description, price_per_hour, icon, status) VALUES
('Drone for Videography', 'Professional aerial videography for events, real estate, and commercial projects', 150.00, 'video', 'active'),
('Drone for Photoshoot', 'High-quality aerial photography for weddings, portraits, and landscapes', 120.00, 'camera', 'active'),
('Drone for Agriculture', 'Crop monitoring, field mapping, and precision agriculture services', 200.00, 'wheat', 'active'),
('Drone for Surveillance', 'Security monitoring and surveillance for properties and events', 180.00, 'shield', 'active'),
('Drone for Inspection', 'Infrastructure inspection for buildings, towers, and industrial facilities', 220.00, 'search', 'active'),
('Drone for Custom Needs', 'Customized drone services tailored to your specific requirements', 175.00, 'settings', 'active');

-- Create admin user (password: admin123)
INSERT INTO users (full_name, email, phone, password_hash, status) VALUES
('Admin User', 'admin@skyvisionpro.com', '+1234567890', 'hashed_password_here', 'active');
`
      
      fs.writeFileSync(path.join(this.rootDir, 'scripts', 'database-setup.sql'), dbSetupScript)
      this.log('Database setup script created')
    }
  }

  async setupSecurity() {
    this.log('Setting up security configurations...')
    
    // Create security configuration
    const securityConfig = {
      rate_limiting: {
        window_ms: 15 * 60 * 1000, // 15 minutes
        max_requests: 100,
        skip_successful_requests: false,
        skip_failed_requests: false,
      },
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowed_headers: ['Content-Type', 'Authorization'],
      },
      helmet: {
        content_security_policy: {
          directives: {
            default_src: ["'self'"],
            script_src: ["'self'", "'unsafe-inline'"],
            style_src: ["'self'", "'unsafe-inline'"],
            img_src: ["'self'", "data:", "https:"],
            connect_src: ["'self'", "https://api.razorpay.com"],
          },
        },
      },
    }
    
    fs.writeFileSync(
      path.join(this.rootDir, 'config', 'security.json'),
      JSON.stringify(securityConfig, null, 2)
    )
    this.log('Security configuration created')
  }

  async setupMonitoring() {
    this.log('Setting up monitoring...')
    
    // Create monitoring configuration
    const monitoringConfig = {
      sentry: {
        dsn: process.env.SENTRY_DSN || '',
        environment: process.env.NODE_ENV || 'development',
        traces_sample_rate: 0.1,
      },
      performance: {
        enabled: true,
        sample_rate: 0.1,
        max_duration: 10000,
      },
      logging: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        format: 'json',
        destination: 'file',
        filename: 'logs/app.log',
      },
    }
    
    fs.writeFileSync(
      path.join(this.rootDir, 'config', 'monitoring.json'),
      JSON.stringify(monitoringConfig, null, 2)
    )
    
    // Create logs directory
    const logsDir = path.join(this.rootDir, 'logs')
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true })
    }
    
    this.log('Monitoring configuration created')
  }

  async generateProductionConfig() {
    this.log('Generating production configuration...')
    
    // Create next.config.js for production
    const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost', 'skyvisionpro.com'],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/health',
        destination: '/api/health',
      },
    ]
  },
}

module.exports = nextConfig
`
    
    fs.writeFileSync(path.join(this.rootDir, 'next.config.js'), nextConfig)
    this.log('Production Next.js configuration created')
  }

  async runTests() {
    this.log('Running tests...')
    
    try {
      // Run the test suite
      execSync('node scripts/test-suite.js', { stdio: 'inherit', cwd: this.rootDir })
      this.log('Tests passed successfully')
    } catch (error) {
      this.log('Some tests failed, but continuing with setup...', 'warn')
    }
  }

  async createDeploymentScripts() {
    this.log('Creating deployment scripts...')
    
    // Create PM2 ecosystem file
    const pm2Config = `module.exports = {
  apps: [
    {
      name: 'skyvision-pro',
      script: 'npm',
      args: 'start',
      cwd: './',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
    },
  ],
}
`
    
    fs.writeFileSync(path.join(this.rootDir, 'ecosystem.config.js'), pm2Config)
    
    // Create deployment script
    const deployScript = `#!/bin/bash
# Deployment script for SkyVision Pro

echo "Starting deployment..."

# Pull latest changes
git pull origin main

# Install dependencies
pnpm install

# Build the application
pnpm build

# Run database migrations (if needed)
# mysql -u root -p < scripts/database-setup.sql

# Restart the application
pm2 restart ecosystem.config.js --env production

echo "Deployment completed!"
`
    
    fs.writeFileSync(path.join(this.rootDir, 'deploy.sh'), deployScript)
    fs.chmodSync(path.join(this.rootDir, 'deploy.sh'), '755')
    
    this.log('Deployment scripts created')
  }

  saveSetupLog() {
    const logPath = path.join(this.rootDir, 'logs', 'setup.log')
    fs.writeFileSync(logPath, this.setupLog.join('\n'))
    this.log(`Setup log saved to: ${logPath}`)
  }
}

// Run the setup
if (require.main === module) {
  const setup = new ProductionSetup()
  setup.run().catch(console.error)
}

module.exports = ProductionSetup 