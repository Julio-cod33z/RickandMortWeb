import pool from "../config/db.js";

export const getAllMisionesFromDB = async () => {
  const [rows] = await pool.query("SELECT * FROM misiones");
  return rows;
};

export const getMisionById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM misiones WHERE id = ?", [id]);
  return rows[0] || null;
};

export const createMisionInDB = async (mision) => {
  const {
    titulo,
    estado,
    dimension_objetivo,
    id_personaje_asignado,
    id_ubicacion_objetivo,
    prioridad,
  } = mision;

  const [result] = await pool.query(
    `INSERT INTO misiones 
      (titulo, estado, dimension_objetivo, id_personaje_asignado, id_ubicacion_objetivo, prioridad)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      titulo,
      estado,
      dimension_objetivo,
      id_personaje_asignado,
      id_ubicacion_objetivo,
      prioridad,
    ]
  );

  return { id: result.insertId, ...mision };
};

export const updateMisionInDB = async (id, mision) => {
  const {
    titulo,
    estado,
    dimension_objetivo,
    id_personaje_asignado,
    id_ubicacion_objetivo,
    prioridad,
  } = mision;

  const [result] = await pool.query(
    `UPDATE misiones
     SET titulo = ?, estado = ?, dimension_objetivo = ?, 
         id_personaje_asignado = ?, id_ubicacion_objetivo = ?, prioridad = ?
     WHERE id = ?`,
    [
      titulo,
      estado,
      dimension_objetivo,
      id_personaje_asignado,
      id_ubicacion_objetivo,
      prioridad,
      id,
    ]
  );

  if (result.affectedRows === 0) return null;
  return { id, ...mision };
};

export const deleteMisionFromDB = async (id) => {
  const [result] = await pool.query("DELETE FROM misiones WHERE id = ?", [id]);
  return result.affectedRows > 0;
};