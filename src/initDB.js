import pool from "./config/db.js";

async function createTable() {
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS misiones (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        estado ENUM('Pendiente', 'En Proceso', 'Completada', 'Fallida') DEFAULT 'Pendiente',
        dimension_objetivo VARCHAR(50) NOT NULL,
        id_personaje_asignado INT NOT NULL,
        id_ubicacion_objetivo INT NOT NULL,
        prioridad INT CHECK (prioridad BETWEEN 1 AND 5)
      );
    `;

    await pool.query(sql);
    console.log("✅ Tabla 'misiones' creada correctamente.");

    // 👉 Inserta algunos registros de prueba
    const inserts = `
      INSERT INTO misiones (titulo, estado, dimension_objetivo, id_personaje_asignado, id_ubicacion_objetivo, prioridad)
        VALUES ('Recuperar la Semilla Gigante de Meeseeks', 'Completada', 'Dimensión de las Semillas', 1, 2, 5),
        ('Comprar leche interdimensional', 'Pendiente', 'Tierra (C-137)', 2, 1, 2),
        ('Neutralizar a Evil Morty', 'En Proceso', 'Dimensión del Evil Morty', 1, 2, 4),
        ('Rescatar a Birdperson de la Federación', 'Fallida', 'Cronenberg World', 1, 3, 3),
        ('Calibrar el Motor de la Nave con Cristales Fluvales', 'Pendiente', 'Dimensión de Cristal', 2, 1, 1),
        ('Neutralizar la amenaza de los parásitos alienígenas', 'En Proceso', 'Dimensión Desconocida', 5, 7, 5),
        ('Infiltrarse en la nave de la Federación Galáctica', 'Pendiente', 'Dimensión K-22', 3, 8, 4),
        ('Coordinar la armonía entre tres planetas en guerra', 'Completada', 'Dimensión Unificada 99', 7, 6, 3),
        ('Arreglar la máquina de teletransporte averiada', 'Fallida', 'Dimensión Beta-7', 6, 7, 3),
        ('Eliminar una plaga de Slime-Monsters en Alpha-2', 'En Proceso', 'Dimensión Alpha-2', 8, 5, 2),
        ('Encontrar un nuevo trabajo en una dimensión menos hostil', 'Pendiente', 'Dimensión de Jerry', 4, 4, 1),
        ('Obtener el Hueso de Kraken para la sopa de Rick', 'En Proceso', 'Dimensión Acuática', 2, 6, 2),
        ('Desactivar el escudo de seguridad de la Ciudadela', 'Completada', 'C-137', 1, 2, 5),
        ('Intercambiar la ropa con una versión alternativa', 'Pendiente', 'Dimensión de los Clones', 3, 7, 1),
        ('Encontrar al traidor que lo convirtió en Phoenixperson', 'Fallida', 'Dimensión A-01', 5, 3, 4);
    `;

    await pool.query(inserts);
    console.log("✅ Datos insertados correctamente.");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creando la tabla o insertando datos:", error);
    process.exit(1);
  }
}

createTable();