import mysql from 'mysql2/promise'

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'drone_booking',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
}

// Create connection pool
let pool: mysql.Pool | null = null

export async function getDatabaseConnection(): Promise<mysql.Pool> {
  if (!pool) {
    try {
      pool = mysql.createPool(dbConfig)
      
      // Test the connection
      const connection = await pool.getConnection()
      console.log('✅ Database connected successfully to cloud MySQL')
      connection.release()
    } catch (error) {
      console.error('❌ Database connection failed:', error)
      throw new Error('Failed to connect to database')
    }
  }
  return pool
}

// Helper function to execute queries
export async function executeQuery<T = any>(
  query: string,
  params: any[] = []
): Promise<T[]> {
  try {
    const pool = await getDatabaseConnection()
    const [rows] = await pool.execute(query, params)
    return rows as T[]
  } catch (error) {
    console.error('Query execution failed:', error)
    throw error
  }
}

// Helper function to execute single row queries
export async function executeQuerySingle<T = any>(
  query: string,
  params: any[] = []
): Promise<T | null> {
  try {
    const pool = await getDatabaseConnection()
    const [rows] = await pool.execute(query, params)
    const results = rows as T[]
    return results.length > 0 ? results[0] : null
  } catch (error) {
    console.error('Query execution failed:', error)
    throw error
  }
}

// Helper function to execute insert/update/delete queries
export async function executeUpdate(
  query: string,
  params: any[] = []
): Promise<{ affectedRows: number; insertId?: number }> {
  try {
    const pool = await getDatabaseConnection()
    const [result] = await pool.execute(query, params)
    return result as { affectedRows: number; insertId?: number }
  } catch (error) {
    console.error('Update query execution failed:', error)
    throw error
  }
}

// Close database connection
export async function closeDatabaseConnection(): Promise<void> {
  if (pool) {
    await pool.end()
    pool = null
    console.log('Database connection closed')
  }
}

// Database initialization function
export async function initializeDatabase(): Promise<void> {
  try {
    const pool = await getDatabaseConnection()
    
    // Create tables if they don't exist
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        password_hash VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL,
        status ENUM('active', 'inactive', 'suspended') DEFAULT 'active'
      )
    `
    
    const createServicesTable = `
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price_per_hour DECIMAL(10,2) NOT NULL,
        icon VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('active', 'inactive') DEFAULT 'active'
      )
    `
    
    const createBookingsTable = `
      CREATE TABLE IF NOT EXISTS bookings (
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
      )
    `
    
    await pool.execute(createUsersTable)
    await pool.execute(createServicesTable)
    await pool.execute(createBookingsTable)
    
    // Insert default services if they don't exist
    const insertServices = `
      INSERT IGNORE INTO services (name, description, price_per_hour, icon, status) VALUES
      ('Drone for Videography', 'Professional aerial videography for events, real estate, and commercial projects', 150.00, 'video', 'active'),
      ('Drone for Photoshoot', 'High-quality aerial photography for weddings, portraits, and landscapes', 120.00, 'camera', 'active'),
      ('Drone for Agriculture', 'Crop monitoring, field mapping, and precision agriculture services', 200.00, 'wheat', 'active'),
      ('Drone for Surveillance', 'Security monitoring and surveillance for properties and events', 180.00, 'shield', 'active'),
      ('Drone for Inspection', 'Infrastructure inspection for buildings, towers, and industrial facilities', 220.00, 'search', 'active'),
      ('Drone for Custom Needs', 'Customized drone services tailored to your specific requirements', 175.00, 'settings', 'active')
    `
    
    await pool.execute(insertServices)
    
    console.log('✅ Database initialized successfully')
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    throw error
  }
} 