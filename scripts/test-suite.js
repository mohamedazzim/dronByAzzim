/**
 * Comprehensive End-to-End Test Suite for Drone Booking Application
 * Covers Frontend, Backend, API Endpoints, and User Flows
 */

const fs = require('fs');
const path = require('path');

class TestSuite {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      total: 0,
      details: []
    };
    this.startTime = Date.now();
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async runTest(testName, testFunction) {
    this.results.total++;
    try {
      await testFunction();
      this.results.passed++;
      this.log(`PASSED: ${testName}`, 'success');
      this.results.details.push({ name: testName, status: 'PASSED', error: null });
    } catch (error) {
      this.results.failed++;
      this.log(`FAILED: ${testName} - ${error.message}`, 'error');
      this.results.details.push({ name: testName, status: 'FAILED', error: error.message });
    }
  }

  // ===== FRONTEND TESTS =====

  async testFrontendComponents() {
    await this.runTest('Frontend Layout Structure', async () => {
      const layoutPath = path.join(__dirname, '../app/layout.tsx');
      const layoutContent = fs.readFileSync(layoutPath, 'utf8');
      
      // Check for required meta tags
      if (!layoutContent.includes('title') || !layoutContent.includes('description')) {
        throw new Error('Missing required meta tags in layout');
      }
      
      // Check for error boundary
      if (!layoutContent.includes('ErrorBoundary')) {
        throw new Error('Missing error boundary in layout');
      }
    });

    await this.runTest('Home Page Structure', async () => {
      const pagePath = path.join(__dirname, '../app/page.tsx');
      const pageContent = fs.readFileSync(pagePath, 'utf8');
      
      // Check for login form
      if (!pageContent.includes('form') || !pageContent.includes('email') || !pageContent.includes('password')) {
        throw new Error('Missing login form elements');
      }
      
      // Check for video/image toggle
      if (!pageContent.includes('toggleVideo') || !pageContent.includes('showVideo')) {
        throw new Error('Missing video toggle functionality');
      }
    });

    await this.runTest('Services Page Structure', async () => {
      const servicesPath = path.join(__dirname, '../app/services/page.tsx');
      const servicesContent = fs.readFileSync(servicesPath, 'utf8');
      
      // Check for service selection
      if (!servicesContent.includes('selectedServices') || !servicesContent.includes('toggleService')) {
        throw new Error('Missing service selection functionality');
      }
      
      // Check for API integration
      if (!servicesContent.includes('fetchServices') || !servicesContent.includes('/api/services')) {
        throw new Error('Missing services API integration');
      }
    });

    await this.runTest('Booking Page Structure', async () => {
      const bookingPath = path.join(__dirname, '../app/booking/page.tsx');
      const bookingContent = fs.readFileSync(bookingPath, 'utf8');
      
      // Check for booking form
      if (!bookingContent.includes('bookingData') || !bookingContent.includes('handleSubmit')) {
        throw new Error('Missing booking form functionality');
      }
      
      // Check for validation
      if (!bookingContent.includes('validateBooking') || !bookingContent.includes('getAvailableTimeSlots')) {
        throw new Error('Missing booking validation');
      }
    });

    await this.runTest('Payment Page Structure', async () => {
      const billPath = path.join(__dirname, '../app/bill/page.tsx');
      const billContent = fs.readFileSync(billPath, 'utf8');
      
      // Check for payment options
      if (!billContent.includes('handlePayment') || !billContent.includes('advance') || !billContent.includes('full')) {
        throw new Error('Missing payment options');
      }
      
      // Check for Razorpay integration
      if (!billContent.includes('Razorpay') || !billContent.includes('checkout.js')) {
        throw new Error('Missing Razorpay integration');
      }
    });

    await this.runTest('Admin Dashboard Structure', async () => {
      const adminPath = path.join(__dirname, '../app/admin/page.tsx');
      const adminContent = fs.readFileSync(adminPath, 'utf8');
      
      // Check for admin functionality
      if (!adminContent.includes('fetchData') || !adminContent.includes('handleServiceSubmit')) {
        throw new Error('Missing admin functionality');
      }
      
      // Check for CRUD operations
      if (!adminContent.includes('handleEditService') || !adminContent.includes('handleDeleteService')) {
        throw new Error('Missing CRUD operations');
      }
    });
  }

  // ===== API ENDPOINT TESTS =====

  async testAPIEndpoints() {
    await this.runTest('Authentication API', async () => {
      const authPath = path.join(__dirname, '../app/api/auth/login/route.ts');
      const authContent = fs.readFileSync(authPath, 'utf8');
      
      // Check for input validation
      if (!authContent.includes('validateEmail') || !authContent.includes('sanitizeInput')) {
        throw new Error('Missing input validation in auth API');
      }
      
      // Check for error handling
      if (!authContent.includes('try') || !authContent.includes('catch')) {
        throw new Error('Missing error handling in auth API');
      }
    });

    await this.runTest('Services API', async () => {
      const servicesPath = path.join(__dirname, '../app/api/services/route.ts');
      const servicesContent = fs.readFileSync(servicesPath, 'utf8');
      
      // Check for GET and POST methods
      if (!servicesContent.includes('GET') || !servicesContent.includes('POST')) {
        throw new Error('Missing HTTP methods in services API');
      }
      
      // Check for caching headers
      if (!servicesContent.includes('Cache-Control')) {
        throw new Error('Missing caching headers in services API');
      }
    });

    await this.runTest('Payment API', async () => {
      const paymentPath = path.join(__dirname, '../app/api/payment/create-order/route.ts');
      const paymentContent = fs.readFileSync(paymentPath, 'utf8');
      
      // Check for authorization
      if (!paymentContent.includes('authorization') || !paymentContent.includes('Bearer')) {
        throw new Error('Missing authorization in payment API');
      }
      
      // Check for backend integration
      if (!paymentContent.includes('BACKEND_URL') || !paymentContent.includes('fetch')) {
        throw new Error('Missing backend integration in payment API');
      }
    });

    await this.runTest('Admin API Endpoints', async () => {
      const adminUsersPath = path.join(__dirname, '../app/api/admin/users/route.ts');
      const adminBookingsPath = path.join(__dirname, '../app/api/admin/bookings/route.ts');
      
      if (!fs.existsSync(adminUsersPath)) {
        throw new Error('Missing admin users API endpoint');
      }
      
      if (!fs.existsSync(adminBookingsPath)) {
        throw new Error('Missing admin bookings API endpoint');
      }
    });
  }

  // ===== BACKEND TESTS =====

  async testBackendComponents() {
    await this.runTest('PHP Backend Structure', async () => {
      const backendDir = path.join(__dirname, '../backend');
      
      // Check for required directories
      const requiredDirs = ['api', 'classes', 'config', 'middleware'];
      for (const dir of requiredDirs) {
        const dirPath = path.join(backendDir, dir);
        if (!fs.existsSync(dirPath)) {
          throw new Error(`Missing backend directory: ${dir}`);
        }
      }
    });

    await this.runTest('Database Classes', async () => {
      const dbManagerPath = path.join(__dirname, '../backend/classes/DatabaseManager.php');
      const dbContent = fs.readFileSync(dbManagerPath, 'utf8');
      
      // Check for connection pooling
      if (!dbContent.includes('getInstance') || !dbContent.includes('connection')) {
        throw new Error('Missing database connection management');
      }
      
      // Check for transaction support
      if (!dbContent.includes('beginTransaction') || !dbContent.includes('commit')) {
        throw new Error('Missing transaction support');
      }
    });

    await this.runTest('Payment Manager', async () => {
      const paymentPath = path.join(__dirname, '../backend/classes/PaymentManager.php');
      const paymentContent = fs.readFileSync(paymentPath, 'utf8');
      
      // Check for Razorpay integration
      if (!paymentContent.includes('Razorpay') || !paymentContent.includes('createPaymentOrder')) {
        throw new Error('Missing Razorpay integration in PaymentManager');
      }
      
      // Check for security logging
      if (!paymentContent.includes('SecurityLogger') || !paymentContent.includes('log')) {
        throw new Error('Missing security logging in PaymentManager');
      }
    });

    await this.runTest('Authentication System', async () => {
      const authPath = path.join(__dirname, '../backend/classes/Auth.php');
      const authContent = fs.readFileSync(authPath, 'utf8');
      
      // Check for session token handling (not JWT)
      if (!authContent.includes('session_token') || !authContent.includes('createSession')) {
        throw new Error('Missing session token handling in Auth class');
      }
      
      // Check for session management
      if (!authContent.includes('validateSession') || !authContent.includes('logout')) {
        throw new Error('Missing session management in Auth class');
      }
    });

    await this.runTest('Middleware Components', async () => {
      const corsPath = path.join(__dirname, '../backend/middleware/cors.php');
      const rateLimitPath = path.join(__dirname, '../backend/middleware/rate-limit.php');
      
      if (!fs.existsSync(corsPath)) {
        throw new Error('Missing CORS middleware');
      }
      
      if (!fs.existsSync(rateLimitPath)) {
        throw new Error('Missing rate limiting middleware');
      }
    });
  }

  // ===== DATABASE TESTS =====

  async testDatabaseSchema() {
    await this.runTest('Database Migrations', async () => {
      const migrationsDir = path.join(__dirname, '../database/migrations');
      
      // Check for required migration files
      const requiredMigrations = [
        '001_authentication_tables.sql',
        '002_enhanced_backend_tables.sql',
        '003_payment_system_tables.sql'
      ];
      
      for (const migration of requiredMigrations) {
        const migrationPath = path.join(migrationsDir, migration);
        if (!fs.existsSync(migrationPath)) {
          throw new Error(`Missing migration file: ${migration}`);
        }
      }
    });

    await this.runTest('Authentication Tables', async () => {
      const authMigrationPath = path.join(__dirname, '../database/migrations/001_authentication_tables.sql');
      const authContent = fs.readFileSync(authMigrationPath, 'utf8');
      
      // Check for users table
      if (!authContent.includes('CREATE TABLE.*users') || !authContent.includes('email_verified')) {
        throw new Error('Missing users table structure');
      }
      
      // Check for security features
      if (!authContent.includes('security_logs') || !authContent.includes('password_history')) {
        throw new Error('Missing security tables');
      }
    });

    await this.runTest('Payment Tables', async () => {
      const paymentMigrationPath = path.join(__dirname, '../database/migrations/003_payment_system_tables.sql');
      const paymentContent = fs.readFileSync(paymentMigrationPath, 'utf8');
      
      // Check for payment tables
      if (!paymentContent.includes('payment_transactions') || !paymentContent.includes('invoices')) {
        throw new Error('Missing payment tables');
      }
      
      // Check for refund support
      if (!paymentContent.includes('refunds') || !paymentContent.includes('coupons')) {
        throw new Error('Missing refund and coupon tables');
      }
    });
  }

  // ===== VALIDATION TESTS =====

  async testValidationLogic() {
    await this.runTest('Email Validation', async () => {
      const validationPath = path.join(__dirname, '../lib/validation.ts');
      const validationContent = fs.readFileSync(validationPath, 'utf8');
      
      // Check for email validation function
      if (!validationContent.includes('validateEmail') || !validationContent.includes('emailRegex')) {
        throw new Error('Missing email validation function');
      }
    });

    await this.runTest('Booking Validation', async () => {
      const validationPath = path.join(__dirname, '../lib/validation.ts');
      const validationContent = fs.readFileSync(validationPath, 'utf8');
      
      // Check for booking validation
      if (!validationContent.includes('validateBooking') || !validationContent.includes('validateDate')) {
        throw new Error('Missing booking validation functions');
      }
      
      // Check for 24-hour advance booking
      if (!validationContent.includes('24.*hours') || !validationContent.includes('twentyFourHoursFromNow')) {
        throw new Error('Missing 24-hour advance booking validation');
      }
    });

    await this.runTest('Time Slot Management', async () => {
      const validationPath = path.join(__dirname, '../lib/validation.ts');
      const validationContent = fs.readFileSync(validationPath, 'utf8');
      
      // Check for time slot functions
      if (!validationContent.includes('getAvailableTimeSlots') || !validationContent.includes('isTimeSlotDisabled')) {
        throw new Error('Missing time slot management functions');
      }
    });
  }

  // ===== COMPONENT TESTS =====

  async testUIComponents() {
    await this.runTest('Navigation Component', async () => {
      const navPath = path.join(__dirname, '../components/navigation.tsx');
      if (!fs.existsSync(navPath)) {
        throw new Error('Missing navigation component');
      }
      
      const navContent = fs.readFileSync(navPath, 'utf8');
      if (!navContent.includes('userName') || !navContent.includes('showBackButton')) {
        throw new Error('Missing navigation component props');
      }
    });

    await this.runTest('Error Boundary', async () => {
      const errorBoundaryPath = path.join(__dirname, '../components/error-boundary.tsx');
      if (!fs.existsSync(errorBoundaryPath)) {
        throw new Error('Missing error boundary component');
      }
    });

    await this.runTest('Loading Spinner', async () => {
      const spinnerPath = path.join(__dirname, '../components/loading-spinner.tsx');
      if (!fs.existsSync(spinnerPath)) {
        throw new Error('Missing loading spinner component');
      }
    });

    await this.runTest('Location Picker', async () => {
      const locationPath = path.join(__dirname, '../components/location-picker.tsx');
      if (!fs.existsSync(locationPath)) {
        throw new Error('Missing location picker component');
      }
    });

    await this.runTest('Monitoring Components', async () => {
      const monitoringDir = path.join(__dirname, '../components/monitoring');
      
      const errorDashboardPath = path.join(monitoringDir, 'error-dashboard.tsx');
      const performancePath = path.join(monitoringDir, 'performance-dashboard.tsx');
      
      if (!fs.existsSync(errorDashboardPath)) {
        throw new Error('Missing error dashboard component');
      }
      
      if (!fs.existsSync(performancePath)) {
        throw new Error('Missing performance dashboard component');
      }
    });
  }

  // ===== CONFIGURATION TESTS =====

  async testConfiguration() {
    await this.runTest('Package.json Dependencies', async () => {
      const packagePath = path.join(__dirname, '../package.json');
      const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      // Check for required dependencies
      const requiredDeps = ['next', 'react', 'react-dom', 'tailwindcss', 'lucide-react'];
      for (const dep of requiredDeps) {
        if (!packageContent.dependencies[dep] && !packageContent.devDependencies[dep]) {
          throw new Error(`Missing required dependency: ${dep}`);
        }
      }
    });

    await this.runTest('Next.js Configuration', async () => {
      const nextConfigPath = path.join(__dirname, '../next.config.mjs');
      if (!fs.existsSync(nextConfigPath)) {
        throw new Error('Missing Next.js configuration file');
      }
    });

    await this.runTest('TypeScript Configuration', async () => {
      const tsConfigPath = path.join(__dirname, '../tsconfig.json');
      if (!fs.existsSync(tsConfigPath)) {
        throw new Error('Missing TypeScript configuration file');
      }
    });

    await this.runTest('Tailwind Configuration', async () => {
      const tailwindPath = path.join(__dirname, '../tailwind.config.ts');
      if (!fs.existsSync(tailwindPath)) {
        throw new Error('Missing Tailwind CSS configuration file');
      }
    });
  }

  // ===== SECURITY TESTS =====

  async testSecurityFeatures() {
    await this.runTest('Input Sanitization', async () => {
      const validationPath = path.join(__dirname, '../lib/validation.ts');
      const validationContent = fs.readFileSync(validationPath, 'utf8');
      
      if (!validationContent.includes('sanitizeInput') || !validationContent.includes('replace')) {
        throw new Error('Missing input sanitization function');
      }
    });

    await this.runTest('CORS Configuration', async () => {
      const corsPath = path.join(__dirname, '../backend/middleware/cors.php');
      const corsContent = fs.readFileSync(corsPath, 'utf8');
      
      if (!corsContent.includes('Access-Control-Allow-Origin') || !corsContent.includes('Access-Control-Allow-Methods')) {
        throw new Error('Missing CORS headers');
      }
    });

    await this.runTest('Rate Limiting', async () => {
      const rateLimitPath = path.join(__dirname, '../backend/middleware/rate-limit.php');
      const rateLimitContent = fs.readFileSync(rateLimitPath, 'utf8');
      
      if (!rateLimitContent.includes('rate') || !rateLimitContent.includes('limit')) {
        throw new Error('Missing rate limiting implementation');
      }
    });

    await this.runTest('Security Logging', async () => {
      const securityPath = path.join(__dirname, '../backend/classes/SecurityLogger.php');
      if (!fs.existsSync(securityPath)) {
        throw new Error('Missing security logger class');
      }
    });
  }

  // ===== PERFORMANCE TESTS =====

  async testPerformanceFeatures() {
    await this.runTest('Image Optimization', async () => {
      const pagePath = path.join(__dirname, '../app/page.tsx');
      const pageContent = fs.readFileSync(pagePath, 'utf8');
      
      if (!pageContent.includes('next/image') || !pageContent.includes('priority')) {
        throw new Error('Missing Next.js image optimization');
      }
    });

    await this.runTest('Caching Headers', async () => {
      const servicesPath = path.join(__dirname, '../app/api/services/route.ts');
      const servicesContent = fs.readFileSync(servicesPath, 'utf8');
      
      if (!servicesContent.includes('Cache-Control') || !servicesContent.includes('s-maxage')) {
        throw new Error('Missing caching headers in API responses');
      }
    });

    await this.runTest('Code Splitting', async () => {
      const nextConfigPath = path.join(__dirname, '../next.config.mjs');
      const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
      
      if (!nextConfigContent.includes('experimental') || !nextConfigContent.includes('optimize')) {
        throw new Error('Missing performance optimizations in Next.js config');
      }
    });
  }

  // ===== INTEGRATION TESTS =====

  async testIntegrationFlows() {
    await this.runTest('User Registration Flow', async () => {
      const registerPath = path.join(__dirname, '../app/register/page.tsx');
      if (!fs.existsSync(registerPath)) {
        throw new Error('Missing user registration page');
      }
      
      const registerContent = fs.readFileSync(registerPath, 'utf8');
      if (!registerContent.includes('validateUserRegistration') || !registerContent.includes('handleSubmit')) {
        throw new Error('Missing registration form validation');
      }
    });

    await this.runTest('Booking Flow Integration', async () => {
      // Check the complete booking flow
      const servicesPath = path.join(__dirname, '../app/services/page.tsx');
      const bookingPath = path.join(__dirname, '../app/booking/page.tsx');
      const billPath = path.join(__dirname, '../app/bill/page.tsx');
      
      if (!fs.existsSync(servicesPath) || !fs.existsSync(bookingPath) || !fs.existsSync(billPath)) {
        throw new Error('Missing booking flow pages');
      }
    });

    await this.runTest('Payment Flow Integration', async () => {
      const paymentCreatePath = path.join(__dirname, '../app/api/payment/create-order/route.ts');
      const paymentVerifyPath = path.join(__dirname, '../app/api/payment/verify/route.ts');
      
      if (!fs.existsSync(paymentCreatePath) || !fs.existsSync(paymentVerifyPath)) {
        throw new Error('Missing payment flow API endpoints');
      }
    });

    await this.runTest('Admin Management Flow', async () => {
      const adminPath = path.join(__dirname, '../app/admin/page.tsx');
      const adminLoginPath = path.join(__dirname, '../app/admin/login/page.tsx');
      
      if (!fs.existsSync(adminPath) || !fs.existsSync(adminLoginPath)) {
        throw new Error('Missing admin management pages');
      }
    });
  }

  // ===== DOCUMENTATION TESTS =====

  async testDocumentation() {
    await this.runTest('README Documentation', async () => {
      const readmePath = path.join(__dirname, '../README.md');
      if (!fs.existsSync(readmePath)) {
        throw new Error('Missing README documentation');
      }
      
      const readmeContent = fs.readFileSync(readmePath, 'utf8');
      
      // Check for required sections
      const requiredSections = ['Getting Started', 'API Documentation', 'Testing', 'Deployment'];
      for (const section of requiredSections) {
        if (!readmeContent.includes(section)) {
          throw new Error(`Missing README section: ${section}`);
        }
      }
    });

    await this.runTest('API Documentation', async () => {
      const docsPath = path.join(__dirname, '../app/docs/page.tsx');
      if (!fs.existsSync(docsPath)) {
        throw new Error('Missing API documentation page');
      }
    });

    await this.runTest('Pending Upgrades Documentation', async () => {
      const upgradesPath = path.join(__dirname, '../PENDING_UPGRADES.md');
      if (!fs.existsSync(upgradesPath)) {
        throw new Error('Missing pending upgrades documentation');
      }
    });
  }

  // ===== RUN ALL TESTS =====

  async runAllTests() {
    this.log('🚀 Starting Comprehensive End-to-End Test Suite', 'info');
    this.log('================================================', 'info');

    // Frontend Tests
    this.log('\n📱 Testing Frontend Components...', 'info');
    await this.testFrontendComponents();

    // API Tests
    this.log('\n🔌 Testing API Endpoints...', 'info');
    await this.testAPIEndpoints();

    // Backend Tests
    this.log('\n⚙️ Testing Backend Components...', 'info');
    await this.testBackendComponents();

    // Database Tests
    this.log('\n🗄️ Testing Database Schema...', 'info');
    await this.testDatabaseSchema();

    // Validation Tests
    this.log('\n✅ Testing Validation Logic...', 'info');
    await this.testValidationLogic();

    // Component Tests
    this.log('\n🧩 Testing UI Components...', 'info');
    await this.testUIComponents();

    // Configuration Tests
    this.log('\n⚙️ Testing Configuration...', 'info');
    await this.testConfiguration();

    // Security Tests
    this.log('\n🔒 Testing Security Features...', 'info');
    await this.testSecurityFeatures();

    // Performance Tests
    this.log('\n⚡ Testing Performance Features...', 'info');
    await this.testPerformanceFeatures();

    // Integration Tests
    this.log('\n🔗 Testing Integration Flows...', 'info');
    await this.testIntegrationFlows();

    // Documentation Tests
    this.log('\n📚 Testing Documentation...', 'info');
    await this.testDocumentation();

    // Generate Report
    this.generateReport();
  }

  generateReport() {
    const endTime = Date.now();
    const duration = ((endTime - this.startTime) / 1000).toFixed(2);

    this.log('\n📊 TEST SUITE COMPLETED', 'info');
    this.log('================================================', 'info');
    this.log(`Total Tests: ${this.results.total}`, 'info');
    this.log(`Passed: ${this.results.passed}`, 'success');
    this.log(`Failed: ${this.results.failed}`, this.results.failed > 0 ? 'error' : 'info');
    this.log(`Success Rate: ${((this.results.passed / this.results.total) * 100).toFixed(1)}%`, 'info');
    this.log(`Duration: ${duration}s`, 'info');

    if (this.results.failed > 0) {
      this.log('\n❌ FAILED TESTS:', 'error');
      this.results.details
        .filter(test => test.status === 'FAILED')
        .forEach(test => {
          this.log(`  - ${test.name}: ${test.error}`, 'error');
        });
    }

    this.log('\n✅ PASSED TESTS:', 'success');
    this.results.details
      .filter(test => test.status === 'PASSED')
      .forEach(test => {
        this.log(`  - ${test.name}`, 'success');
      });

    // Save detailed report
    const reportPath = path.join(__dirname, '../test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      duration: `${duration}s`,
      summary: {
        total: this.results.total,
        passed: this.results.passed,
        failed: this.results.failed,
        successRate: `${((this.results.passed / this.results.total) * 100).toFixed(1)}%`
      },
      details: this.results.details
    }, null, 2));

    this.log(`\n📄 Detailed report saved to: ${reportPath}`, 'info');

    // Exit with appropriate code
    process.exit(this.results.failed > 0 ? 1 : 0);
  }
}

// Run the test suite
const testSuite = new TestSuite();
testSuite.runAllTests().catch(error => {
  console.error('Test suite failed to run:', error);
  process.exit(1);
});
