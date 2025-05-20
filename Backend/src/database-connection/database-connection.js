// database-connection.js
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// Creamos un pool que gestiona múltiples conexiones y auto-reconexiones
const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port:     process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,  
  queueLimit: 0
});

pool.on('connection', conn => {
  console.log('Nueva conexión del pool, id:', conn.threadId);
});
pool.on('error', err => {
  console.error('Error en el pool de conexiones MySQL:', err);
});

export default pool;
