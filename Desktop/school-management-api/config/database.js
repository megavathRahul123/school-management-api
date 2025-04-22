import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connectionUrl = "mysql://root:iaHHTukxlwdlQFlWuKcaFKyISZGybWFA@yamabiko.proxy.rlwy.net:39962/railway";

const pool = mysql.createPool(connectionUrl);

// Test the connection
try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database');
    connection.release();
} catch (error) {
    console.error('Error connecting to the database:', error);
}

export { pool as db };
