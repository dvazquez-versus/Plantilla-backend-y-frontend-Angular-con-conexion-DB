import db from '../database-connection/database-connection.js';

// Obtener todos los empleados
export function getAllUsersController(req, res) {
  db.query('SELECT * FROM versus_empleados', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).send('Error en la base de datos');
    }
    res.json(results); // Devuelve todos los empleados
  });
}

// Obtener un empleado por su ID
export function getUserByIdController(req, res) {
  const { id } = req.params; // Obtén el ID del empleado desde los parámetros de la URL
  db.query('SELECT * FROM versus_empleados WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).send('Error en la base de datos');
    }
    if (results.length === 0) {
      return res.status(404).send('Empleado no encontrado');
    }
    res.json(results[0]); // Devuelve el empleado con el ID específico
  });
}

// Crear un nuevo empleado
export function createUserController(req, res) {
  const { nombre, departamento_id, cargo, foto, equipo, superiores, personal_a_cargo } = req.body;
  
  const query = `
    INSERT INTO versus_empleados (nombre, departamento_id, cargo, foto, equipo, superiores, personal_a_cargo)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  
  db.query(query, [nombre, departamento_id, cargo, foto, equipo, superiores, personal_a_cargo], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).send('Error en la base de datos');
    }
    res.status(201).json({ id: results.insertId, nombre, departamento_id, cargo, foto, equipo, superiores, personal_a_cargo });
  });
}

// Actualizar un empleado existente
export function updateUserController(req, res) {
  const { id } = req.params; // Obtén el ID del empleado desde los parámetros de la URL
  const { nombre, departamento_id, cargo, foto, equipo, superiores, personal_a_cargo } = req.body;
  
  const query = `
    UPDATE versus_empleados 
    SET nombre = ?, departamento_id = ?, cargo = ?, foto = ?, equipo = ?, superiores = ?, personal_a_cargo = ?
    WHERE id = ?
  `;
  
  db.query(query, [nombre, departamento_id, cargo, foto, equipo, superiores, personal_a_cargo, id], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).send('Error en la base de datos');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Empleado no encontrado');
    }
    res.json({ id, nombre, departamento_id, cargo, foto, equipo, superiores, personal_a_cargo });
  });
}

// Eliminar un empleado por su ID
export function deleteUserController(req, res) {
  const { id } = req.params; // Obtén el ID del empleado desde los parámetros de la URL
  
  db.query('DELETE FROM versus_empleados WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).send('Error en la base de datos');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('Empleado no encontrado');
    }
    res.status(204).send(); // Respuesta sin contenido al eliminar
  });
}
