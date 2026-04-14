const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '08102005a',
  database: 'todo_db',
});

module.exports = pool;