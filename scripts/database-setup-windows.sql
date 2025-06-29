-- Database Setup Script for SkyVision Pro (Windows)
-- Run this script to set up the database

CREATE DATABASE IF NOT EXISTS drone_booking;
USE drone_booking;

-- Run migrations in order
SOURCE C:/Users/azzim/Downloads/drone-booking-app (2)/database/migrations/001_authentication_tables.sql;
SOURCE C:/Users/azzim/Downloads/drone-booking-app (2)/database/migrations/002_enhanced_backend_tables.sql;
SOURCE C:/Users/azzim/Downloads/drone-booking-app (2)/database/migrations/003_payment_system_tables.sql;

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
