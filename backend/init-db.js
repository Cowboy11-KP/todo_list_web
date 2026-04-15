require('dotenv').config();
const mysql = require('mysql2/promise');

async function initializeDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
        });

        console.log("⏳ Đang kết nối MySQL...");

        const dbName = process.env.DB_NAME || 'todo_db';
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        console.log("✔️ Đã tạo (hoặc tìm thấy) database: todo_db");

        await connection.query(`USE \`${dbName}\``);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL
            )
        `);
        console.log("✔️ Đã tạo bảng: users");

        await connection.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                priority ENUM('low', 'medium', 'high'),
                project VARCHAR(100),
                tags JSON,
                due_date DATE,
                due_time TIME,
                completed BOOLEAN DEFAULT FALSE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                completed_at DATETIME,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        console.log("✔️ Đã tạo bảng: tasks");
        
        await connection.end();
        process.exit(0);

    } catch (error) {
        console.error("❌ Lỗi trong quá trình khởi tạo:", error);
        process.exit(1);
    }
}

initializeDatabase();