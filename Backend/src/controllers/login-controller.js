import connection from "../database-connection/database-connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";

export async function login(req, res, next) {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res
      .status(400)
      .json({ message: "Correo y contraseña son obligatorios" });
  }

  try {
    const [rows] = await connection
      .promise()
      .query(
        "SELECT id, nombre, correo, contraseña AS passwordHash, id_fk_rol FROM Usuarios WHERE correo = ?",
        [correo]
      );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const user = rows[0];

    let passwordMatch = false;
    if (/^\$2[aby]\$/.test(user.passwordHash)) {
      passwordMatch = await bcrypt.compare(contraseña, user.passwordHash);
    } else {
      passwordMatch = contraseña === user.passwordHash;
    }

    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const payload = {
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
      rol: user.id_fk_rol,
    };

    const token = jwt.sign(payload, config.app.secretKey, {
      expiresIn: process.env.TOKEN_EXPIRATION || "30d",
    });

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: payload,
      token, 
    });

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: payload,
    });
  } catch (error) {
    console.error("⚠️ Error en login:", error);
    return next(error);
  }
}