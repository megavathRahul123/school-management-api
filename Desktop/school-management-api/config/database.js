import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database');
    connection.release();
} catch (error) {
    console.error('Error connecting to the database:', error);
}

export { pool as db };