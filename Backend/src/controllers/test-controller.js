import db from '../database-connection/database-connection.js';

export function pingController(req, res) {
    res.send('pong');
}






// Controladores para pruebas, eliminar en nuevos proyectos
export function getAllUsers(req, res) {
  const sql = `
    SELECT 
      u.ID,
      u.Nombre,
      u.Correo,
      u.Contraseña,
      u.ID_FK_Rol,
      r.Rol AS Nombre_Rol
    FROM Usuarios u
    INNER JOIN Roles r
      ON u.ID_FK_Rol = r.ID
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).send('Error en la base de datos');
    }
    res.json(results);
  });
}


  export function getAllRols(req, res) {
    // Realizamos la consulta SQL para obtener todos los datos de la tabla 'usuarios'
    db.query('SELECT * FROM Roles', (err, results) => {
      if (err) {
        // Si ocurre un error, devolvemos una respuesta con el error
        console.error('Error al ejecutar la consulta:', err);
        return res.status(500).send('Error en la base de datos');
      }
      // Si la consulta es exitosa, enviamos los resultados en formato JSON
      res.json(results);
    });
  }
