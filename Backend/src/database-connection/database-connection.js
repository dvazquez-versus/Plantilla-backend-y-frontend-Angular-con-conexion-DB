// Importa las dependencias
import mysql from 'mysql2';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Configuración de la conexión a la base de datos utilizando las variables de entorno
const connection = mysql.createConnection({
  host: process.env.DB_HOST,          // Usamos la variable de entorno DB_HOST
  user: process.env.DB_USER,          // Usamos la variable de entorno DB_USER
  password: process.env.DB_PASSWORD,  // Usamos la variable de entorno DB_PASSWORD
  database: process.env.DB_DATABASE,  // Usamos la variable de entorno DB_DATABASE
  port: process.env.DB_PORT || 3306   // Usamos la variable DB_PORT o el valor por defecto 3306
});

// Conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL como id ' + connection.threadId);
});

// Exportamos la conexión para poder usarla en otros archivos
export default connection;
