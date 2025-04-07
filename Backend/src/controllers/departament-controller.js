import db from '../database-connection/database-connection.js';

// Obtener todos los departamentos
export function getAllDepartamentsController(req, res) {
  db.query('SELECT * FROM versus_departamentos', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).send('Error en la base de datos');
    }
    res.json(results); // Devuelve todos los departamentos
  });
}

// Obtener un departamento por su ID
export function getDepartamentByIdController(req, res) {
  const { id } = req.params; // Obtén el ID del departamento desde los parámetros de la URL
  db.query('SELECT * FROM versus_departamentos WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).send('Error en la base de datos');
    }
    if (results.length === 0) {
      return res.status(404).send('Departamento no encontrado');
    }
    res.json(results[0]); // Devuelve el departamento con el ID específico
  });
}

// Crear un nuevo departamento
export function createDepartamentController(req, res) {
  const { nombre } = req.body; // El nombre del departamento se recibe en el cuerpo de la solicitud
  
  const query = 'INSERT INTO versus_departamentos (nombre) VALUES (?)';
  
  db.query(query, [nombre], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).send('Error en la base de datos');
    }
    res.status(201).json({ id: results.insertId, nombre }); // Devuelve el nuevo departamento creado
  });
}

// Actualizar un departamento existente
export function updateDepartamentController(req, res) {
  const { id } = req.params; // Obtén el ID del departamento desde los parámetros de la URL
  const { nombre } = req.body; // El nuevo nombre del departamento se recibe en el cuerpo de la solicitud
  
  const query = 'UPDATE versus_departamentos SET nombre = ? WHERE id = ?';
  
  db.query(query, [nombre, id], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).send('Error en la base de datos');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Departamento no encontrado');
    }
    res.json({ id, nombre }); // Devuelve el departamento actualizado
  });
}

// Eliminar un departamento por su ID
export function deleteDepartamentController(req, res) {
  const { id } = req.params; // Obtén el ID del departamento desde los parámetros de la URL
  
  db.query('DELETE FROM versus_departamentos WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).send('Error en la base de datos');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Departamento no encontrado');
    }
    res.status(204).send(); // Respuesta sin contenido al eliminar
  });
}
