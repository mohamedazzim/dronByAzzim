# 🚁 SkyVision Pro - Premium Drone Booking Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1)](https://www.mysql.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payment-3399FF)](https://razorpay.com/)

> **Professional drone services booking platform with complete user management, payment processing, and admin dashboard.**

---

## 📋 Table of Contents

- [🚀 Features](#-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [📁 Project Structure](#-project-structure)
- [⚙️ Installation & Setup](#️-installation--setup)
- [🌐 Running Locally with Cloud Database](#-running-locally-with-cloud-database)
- [🔧 Configuration](#-configuration)
- [📱 User Interface](#-user-interface)
- [🔌 API Endpoints](#-api-endpoints)
- [💳 Payment Integration](#-payment-integration)
- [📊 Admin Dashboard](#-admin-dashboard)
- [🔒 Security Features](#-security-features)
- [📈 Monitoring & Analytics](#-monitoring--analytics)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [📚 Documentation](#-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🚀 Features

### 👤 **User Management**
- ✅ **User Registration** - Complete signup with validation
- ✅ **User Login** - Secure authentication with JWT
- ✅ **Password Recovery** - Forgot password functionality
- ✅ **Profile Management** - User data and preferences
- ✅ **Session Management** - Persistent login sessions

### 🎯 **Service Booking**
- ✅ **Service Catalog** - 6 professional drone services
- ✅ **Service Selection** - Multi-service booking support
- ✅ **Location Picker** - Interactive map integration
- ✅ **Date & Time Selection** - Available slot management
- ✅ **Custom Requirements** - Special needs specification
- ✅ **Booking Validation** - 24-hour advance booking rule

### 💳 **Payment System**
- ✅ **Razorpay Integration** - Secure payment gateway
- ✅ **Multiple Payment Options** - Advance (30%) or Full payment
- ✅ **Payment Verification** - Signature verification
- ✅ **Invoice Generation** - Detailed billing
- ✅ **Payment History** - Transaction tracking

### 📊 **Admin Dashboard**
- ✅ **User Management** - View and manage all users
- ✅ **Booking Management** - Status updates and tracking
- ✅ **Service Management** - Add, edit, delete services
- ✅ **Analytics Dashboard** - Performance metrics
- ✅ **Real-time Monitoring** - System health tracking

### 🔒 **Security & Performance**
- ✅ **Input Validation** - Comprehensive form validation
- ✅ **XSS Protection** - Cross-site scripting prevention
- ✅ **CSRF Protection** - Cross-site request forgery protection
- ✅ **Rate Limiting** - API request throttling
- ✅ **Image Optimization** - Next.js Image component
- ✅ **Code Splitting** - Automatic bundle optimization

### 📱 **User Experience**
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Dark/Light Theme** - Theme switching capability
- ✅ **Loading States** - Smooth user feedback
- ✅ **Error Handling** - Graceful error management
- ✅ **Accessibility** - WCAG compliant components

---

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 14.2.16** - React framework with App Router
- **React 18** - UI library with hooks
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### **Backend**
- **Next.js API Routes** - Serverless API endpoints
- **MySQL 8.0+** - Relational database
- **mysql2** - MySQL client for Node.js
- **JWT** - JSON Web Token authentication

### **Payment & External Services**
- **Razorpay** - Payment gateway integration
- **Google Maps API** - Location services
- **SMTP** - Email services

### **Development Tools**
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 📁 Project Structure

```
drone-booking-app/
├── app/                          # Next.js App Router
│   ├── api/                      # API endpoints
│   │   ├── auth/                 # Authentication APIs
│   │   ├── admin/                # Admin management APIs
│   │   ├── bookings/             # Booking management APIs
│   │   ├── payment/              # Payment processing APIs
│   │   ├── services/             # Service management APIs
│   │   ├── monitoring/           # System monitoring APIs
│   │   ├── docs/                 # API documentation
│   │   └── health/               # Health check endpoint
│   ├── admin/                    # Admin dashboard pages
│   ├── booking/                  # Booking flow pages
│   ├── bill/                     # Payment pages
│   ├── bookings/                 # Booking history pages
│   ├── register/                 # User registration page
│   ├── forgot-password/          # Password recovery page
│   ├── services/                 # Service selection page
│   ├── payment-success/          # Payment success page
│   ├── docs/                     # Documentation page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home/login page
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── ui/                       # Base UI components
│   ├── auth/                     # Authentication components
│   ├── payment/                  # Payment components
│   ├── monitoring/               # Monitoring components
│   ├── navigation.tsx            # Navigation component
│   ├── location-picker.tsx       # Location selection
│   └── error-boundary.tsx        # Error handling
├── lib/                          # Utility libraries
│   ├── store.ts                  # Data store
│   ├── database.ts               # Database utilities
│   ├── auth.ts                   # Authentication utilities
│   ├── validation.ts             # Form validation
│   └── utils.ts                  # General utilities
├── hooks/                        # Custom React hooks
├── public/                       # Static assets
│   └── images/                   # Image assets
├── database/                     # Database migrations
├── backend/                      # PHP backend (legacy)
├── scripts/                      # Setup and utility scripts
├── config/                       # Configuration files
└── logs/                         # Application logs
```

---

## ⚙️ Installation & Setup

### **Prerequisites**
- Node.js 18+ 
- npm or pnpm
- MySQL 8.0+ (local or cloud)
- Git

### **Step 1: Clone the Repository**
```bash
git clone <repository-url>
cd drone-booking-app
```

### **Step 2: Install Dependencies**
```bash
npm install
# or
pnpm install
```

### **Step 3: Environment Configuration**
```bash
# Copy environment template
cp env.example .env.local

# Edit .env.local with your configuration
nano .env.local
```

### **Step 4: Database Setup**
```bash
# Run database initialization
node scripts/setup-windows.js
```

### **Step 5: Start Development Server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

---

## 🌐 Running Locally with Cloud Database

### **For Hosting Raja cPanel Database:**

1. **Get Database Credentials from cPanel:**
   - Host: `your-domain.com` (or MySQL host)
   - Username: `cpanel_username_dbname`
   - Password: `your_database_password`
   - Database: `cpanel_username_dbname`

2. **Configure Environment Variables:**
   ```env
   # Database Configuration (Cloud - Hosting Raja)
   DB_HOST=your-domain.com
   DB_USERNAME=cpanel_username_dbname
   DB_PASSWORD=your_database_password
   DB_DATABASE=cpanel_username_dbname
   DB_PORT=3306
   ```

3. **Whitelist Your IP (if needed):**
   - Go to cPanel → Remote MySQL
   - Add your local IP address
   - Find your IP at [whatismyipaddress.com](https://whatismyipaddress.com/)

4. **Install MySQL Dependencies:**
   ```bash
   # Use Command Prompt (not PowerShell) to avoid execution policy issues
   npm install mysql2
   ```

5. **Start the Application:**
   ```bash
   npm run dev
   ```

### **Troubleshooting PowerShell Issues:**
If you encounter PowerShell execution policy errors:
```powershell
# Run as Administrator
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
```

Or use Command Prompt instead of PowerShell for npm commands.

---

## 🔧 Configuration

### **Environment Variables**

```env
# Database Configuration
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=drone_booking
DB_PORT=3306

# Authentication
JWT_SECRET=your-super-secret-jwt-key
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# Payment (Razorpay)
RAZORPAY_KEY_ID=rzp_test_your_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=noreply@yourdomain.com

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Environment
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **Database Schema**

The application automatically creates these tables:

```sql
-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  status ENUM('active', 'inactive', 'suspended') DEFAULT 'active'
);

-- Services table
CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price_per_hour DECIMAL(10,2) NOT NULL,
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('active', 'inactive') DEFAULT 'active'
);

-- Bookings table
CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  service_id INT NOT NULL,
  location VARCHAR(255) NOT NULL,
  booking_date DATE NOT NULL,
  time_slot VARCHAR(20) NOT NULL,
  duration_hours INT NOT NULL,
  total_cost DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  custom_needs TEXT,
  payment_type VARCHAR(50),
  payment_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (service_id) REFERENCES services(id)
);
```

---

## 📱 User Interface

### **Home Page (`/`)**
- **Hero Section** - Cinematic drone video/image background
- **Login Form** - Email/password authentication
- **Registration Link** - Direct to signup page
- **Forgot Password** - Password recovery option
- **Video Toggle** - Switch between video and image background

### **Services Page (`/services`)**
- **Service Grid** - 6 professional drone services
- **Service Cards** - Interactive selection with icons
- **Pricing Display** - Hourly rates for each service
- **Multi-selection** - Choose multiple services
- **Continue Button** - Proceed to booking

### **Booking Page (`/booking`)**
- **Location Picker** - Interactive map integration
- **Date Selection** - Calendar with 24-hour advance rule
- **Time Slots** - Available time slot management
- **Duration Selection** - Hours of service needed
- **Custom Requirements** - Special needs text area
- **Cost Calculator** - Real-time total calculation

### **Bill Page (`/bill`)**
- **Booking Summary** - Complete booking details
- **Cost Breakdown** - Itemized pricing
- **Payment Options** - Advance (30%) or Full payment
- **Razorpay Integration** - Secure payment gateway
- **Payment Processing** - Real-time payment handling

### **Admin Dashboard (`/admin`)**
- **User Management** - View and manage all users
- **Booking Management** - Status updates and tracking
- **Service Management** - CRUD operations for services
- **Analytics** - Performance metrics and charts
- **System Monitoring** - Health checks and logs

---

## 🔌 API Endpoints

### **Authentication APIs**
```http
POST /api/auth/login          # User login
POST /api/auth/register       # User registration
POST /api/auth/forgot-password # Password recovery
```

### **Service APIs**
```http
GET    /api/services          # Get all services
GET    /api/services/[id]     # Get specific service
POST   /api/services          # Create new service
PUT    /api/services/[id]     # Update service
DELETE /api/services/[id]     # Delete service
```

### **Booking APIs**
```http
GET    /api/bookings          # Get user bookings
POST   /api/bookings          # Create new booking
GET    /api/bookings/[id]     # Get specific booking
PUT    /api/bookings/[id]     # Update booking status
DELETE /api/bookings/[id]     # Cancel booking
```

### **Payment APIs**
```http
POST /api/payment/create-order # Create Razorpay order
POST /api/payment/verify       # Verify payment signature
```

### **Admin APIs**
```http
GET /api/admin/users           # Get all users
GET /api/admin/bookings        # Get all bookings
PUT /api/admin/bookings/[id]   # Update booking status
```

### **Monitoring APIs**
```http
GET /api/monitoring/errors     # Get error logs
GET /api/monitoring/performance # Get performance metrics
GET /api/health                # System health check
GET /api/docs                  # API documentation
```

---

## 💳 Payment Integration

### **Razorpay Setup**
1. **Create Razorpay Account** - Sign up at [razorpay.com](https://razorpay.com/)
2. **Get API Keys** - From Razorpay Dashboard
3. **Configure Environment** - Add keys to `.env.local`
4. **Test Mode** - Use test keys for development

### **Payment Flow**
1. **Order Creation** - Backend creates Razorpay order
2. **Payment Gateway** - User redirected to Razorpay
3. **Payment Processing** - Secure payment handling
4. **Verification** - Backend verifies payment signature
5. **Booking Confirmation** - Create booking on success

### **Payment Options**
- **Advance Payment** - 30% of total cost
- **Full Payment** - 100% of total cost
- **Multiple Currencies** - INR, USD support
- **Payment History** - Transaction tracking

---

## 📊 Admin Dashboard

### **Features**
- **User Management** - View, edit, suspend users
- **Booking Management** - Status updates, cancellations
- **Service Management** - Add, edit, delete services
- **Analytics Dashboard** - Revenue, bookings, user stats
- **System Monitoring** - Performance, errors, health
- **Real-time Updates** - Live data refresh

### **Access Control**
- **Admin Authentication** - Secure admin login
- **Role-based Access** - Admin-only features
- **Session Management** - Persistent admin sessions
- **Audit Logging** - Action tracking

---

## 🔒 Security Features

### **Authentication & Authorization**
- **JWT Tokens** - Secure session management
- **Password Hashing** - PBKDF2 with salt
- **Input Validation** - Comprehensive form validation
- **XSS Protection** - Cross-site scripting prevention
- **CSRF Protection** - Cross-site request forgery protection

### **Data Protection**
- **Input Sanitization** - Clean user inputs
- **SQL Injection Prevention** - Parameterized queries
- **Rate Limiting** - API request throttling
- **CORS Configuration** - Cross-origin resource sharing
- **Security Headers** - X-Frame-Options, CSP, etc.

### **Payment Security**
- **Signature Verification** - Razorpay payment verification
- **HTTPS Only** - Secure communication
- **PCI Compliance** - Payment card industry standards
- **Token-based Payments** - Secure payment tokens

---

## 📈 Monitoring & Analytics

### **Performance Monitoring**
- **Response Time Tracking** - API performance metrics
- **Error Rate Monitoring** - System error tracking
- **Throughput Metrics** - Request per minute/hour
- **Resource Usage** - CPU, memory, disk monitoring

### **Business Analytics**
- **Revenue Tracking** - Payment and booking analytics
- **User Analytics** - Registration, login patterns
- **Service Popularity** - Most booked services
- **Geographic Data** - Location-based analytics

### **System Health**
- **Health Check Endpoint** - `/api/health`
- **Database Connectivity** - Connection monitoring
- **External Services** - Payment gateway status
- **Uptime Monitoring** - System availability

---

## 🧪 Testing

### **Test Coverage**
- **Frontend Components** - React component testing
- **API Endpoints** - Backend API testing
- **Integration Tests** - End-to-end workflows
- **Security Tests** - Authentication and authorization

### **Running Tests**
```bash
# Run test suite
npm test

# Run specific tests
node scripts/test-suite.js

# Test results
# Total Tests: 44
# Passed: 41 (93.2%)
# Failed: 3 (6.8%)
```

### **Test Categories**
- ✅ **Frontend Components** - All UI components tested
- ✅ **API Endpoints** - All endpoints verified
- ✅ **Database Operations** - CRUD operations tested
- ✅ **Payment Integration** - Razorpay flow tested
- ✅ **Security Features** - Authentication tested
- ✅ **User Flows** - Complete booking process tested

---

## 🚀 Deployment

### **Local Development**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
```

### **Production Deployment**

#### **Option 1: Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

#### **Option 2: Traditional Hosting**
```bash
# Build the application
npm run build

# Start production server
npm start

# Use PM2 for process management
pm2 start ecosystem.config.js --env production
```

#### **Option 3: Docker**
```dockerfile
# Build Docker image
docker build -t skyvision-pro .

# Run container
docker run -d -p 3000:3000 --env-file .env.local skyvision-pro
```

### **Environment Setup**
1. **Production Database** - Set up MySQL server
2. **Environment Variables** - Configure production values
3. **SSL Certificate** - Enable HTTPS
4. **Domain Configuration** - Set up custom domain
5. **Monitoring** - Set up logging and monitoring

---

## 📚 Documentation

### **Available Documentation**
- **README.md** - Main project documentation
- **DEPLOYMENT.md** - Deployment guide
- **PRODUCTION_READY.md** - Production setup guide
- **PENDING_UPGRADES.md** - Future enhancements
- **API Documentation** - Available at `/api/docs`

### **API Documentation**
Visit `http://localhost:3000/api/docs` for comprehensive API documentation including:
- **Endpoint Descriptions** - Detailed API explanations
- **Request/Response Examples** - Sample API calls
- **Error Codes** - HTTP status codes and meanings
- **Authentication** - JWT token usage
- **Rate Limits** - API usage limits

---

## 🤝 Contributing

### **Development Setup**
1. **Fork the Repository** - Create your fork
2. **Clone Locally** - `git clone <your-fork>`
3. **Install Dependencies** - `npm install`
4. **Create Feature Branch** - `git checkout -b feature/name`
5. **Make Changes** - Implement your feature
6. **Run Tests** - `npm test`
7. **Submit Pull Request** - Create PR with description

### **Code Standards**
- **TypeScript** - Use TypeScript for all new code
- **ESLint** - Follow linting rules
- **Prettier** - Use consistent formatting
- **Component Structure** - Follow existing patterns
- **Documentation** - Add comments for complex logic

### **Testing Guidelines**
- **Unit Tests** - Test individual functions
- **Integration Tests** - Test API endpoints
- **E2E Tests** - Test complete user flows
- **Coverage** - Maintain >90% test coverage

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### **License Terms**
- **Commercial Use** - Allowed
- **Modification** - Allowed
- **Distribution** - Allowed
- **Private Use** - Allowed
- **Liability** - Limited
- **Warranty** - None

---

## 🆘 Support

### **Getting Help**
- **Documentation** - Check the docs first
- **Issues** - Create GitHub issue
- **Discussions** - Use GitHub discussions
- **Email** - support@skyvisionpro.com

### **Common Issues**
- **Database Connection** - Check credentials and network
- **Payment Issues** - Verify Razorpay configuration
- **Build Errors** - Check Node.js version and dependencies
- **Performance** - Monitor database queries and caching

### **Contact Information**
- **Website** - [skyvisionpro.com](https://skyvisionpro.com)
- **Email** - support@skyvisionpro.com
- **Phone** - +1-555-0123
- **GitHub** - [github.com/skyvisionpro](https://github.com/skyvisionpro)

---

## 🎉 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Radix UI** - For accessible component primitives
- **Razorpay** - For secure payment processing
- **Open Source Community** - For all the amazing libraries

---

**Made with ❤️ by the SkyVision Pro Team**

*Professional drone services for all your aerial needs* 🚁✨ 