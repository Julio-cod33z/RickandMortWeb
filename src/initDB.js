import pool from "./db.js";

async function createTable() {
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS misiones (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(100) NOT NULL,
        estado ENUM('Pendiente', 'En Proceso', 'Completada', 'Fallida') DEFAULT 'Pendiente',
        dimension_objetivo VARCHAR(50) NOT NULL,
        id_personaje_asignado INT NOT NULL,
        id_ubicacion_objetivo INT NOT NULL,
        prioridad INT CHECK (prioridad BETWEEN 1 AND 5)
      );
    `;
    await pool.query(sql);
    console.log("✅ Tabla 'misiones' creada correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creando la tabla:", error);
    process.exit(1);
  }
}

createTable();