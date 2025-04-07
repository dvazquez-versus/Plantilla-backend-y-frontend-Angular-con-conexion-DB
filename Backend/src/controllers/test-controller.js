import db from '../database-connection/database-connection.js';

export function pingController(req, res) {
    res.send('pong');
}

export function getAllUsersController(req, res) {
    // Realizamos la consulta SQL para obtener todos los datos de la tabla 'usuarios'
    db.query('SELECT * FROM versus_empleados', (err, results) => {
      if (err) {
        // Si ocurre un error, devolvemos una respuesta con el error
        console.error('Error al ejecutar la consulta:', err);
        return res.status(500).send('Error en la base de datos');
      }
      // Si la consulta es exitosa, enviamos los resultados en formato JSON
      res.json(results);
    });
  }

  export function getAllDepartamentsController(req, res) {
    // Realizamos la consulta SQL para obtener todos los datos de la tabla 'usuarios'
    db.query('SELECT * FROM versus_departamentos', (err, results) => {
      if (err) {
        // Si ocurre un error, devolvemos una respuesta con el error
        console.error('Error al ejecutar la consulta:', err);
        return res.status(500).send('Error en la base de datos');
      }
      // Si la consulta es exitosa, enviamos los resultados en formato JSON
      res.json(results);
    });
  }
