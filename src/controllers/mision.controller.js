import * as MisionModel from "../models/mision.model.js";
import { getCharacterById, getLocationById } from "../services/rickAndMorty.service.js";

export const getMisiones = async (req, res) => {
  try {
    // Obtiene misiones desde MySQL
    const misiones = await MisionModel.getAllMisionesFromDB();

    // Mapea cada misión agregando los datos del personaje y ubicación
    const misionesConDetalles = await Promise.all(
      misiones.map(async (m) => {
        const personaje = await getCharacterById(m.id_personaje_asignado);
        const ubicacion = await getLocationById(m.id_ubicacion_objetivo);

        return {
          ...m,
          personaje_nombre: personaje ? personaje.name : "Desconocido",
          personaje_imagen: personaje ? personaje.image : null,
          ubicacion_nombre: ubicacion ? ubicacion.name : "Desconocida",
          ubicacion_dimension: ubicacion ? ubicacion.dimension : null,
        };
      })
    );

    res.json(misionesConDetalles);
  } catch (error) {
    console.error("Error al obtener misiones:", error);
    res.status(500).json({ error: "Error al obtener misiones" });
  }
};

export const createMision = async (req, res) => {
  try {
    const {
      titulo,
      estado,
      dimension_objetivo,
      id_personaje_asignado,
      id_ubicacion_objetivo,
      prioridad,
    } = req.body;

    // Guardar misión en la base de datos
    const newMision = await MisionModel.createMisionInDB({
      titulo,
      estado,
      dimension_objetivo,
      id_personaje_asignado,
      id_ubicacion_objetivo,
      prioridad,
    });

    // Obtener datos del personaje y ubicación desde la API externa
    const personaje = await getCharacterById(id_personaje_asignado);
    const ubicacion = await getLocationById(id_ubicacion_objetivo);

    // Responder con los datos enriquecidos
    res.status(201).json({
      ...newMision,
      personaje_nombre: personaje ? personaje.name : "Desconocido",
      personaje_imagen: personaje ? personaje.image : null,
      ubicacion_nombre: ubicacion ? ubicacion.name : "Desconocida",
      ubicacion_dimension: ubicacion ? ubicacion.dimension : null,
    });
  } catch (error) {
    console.error("Error al crear misión:", error);
    res.status(500).json({ error: "Error al crear misión" });
  }
};

export const updateMision = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      titulo,
      estado,
      dimension_objetivo,
      id_personaje_asignado,
      id_ubicacion_objetivo,
      prioridad,
    } = req.body;

    // Actualizamos la misión en la base de datos
    const updatedMision = await MisionModel.updateMisionInDB(id, {
      titulo,
      estado,
      dimension_objetivo,
      id_personaje_asignado,
      id_ubicacion_objetivo,
      prioridad,
    });

    if (!updatedMision) {
      return res.status(404).json({ error: "Misión no encontrada" });
    }

    // Obtenemos datos del personaje y la ubicación desde la API pública
    const personaje = await getCharacterById(id_personaje_asignado);
    const ubicacion = await getLocationById(id_ubicacion_objetivo);

    // Devolvemos la misión actualizada con datos enriquecidos
    res.status(200).json({
      id: parseInt(id),
      titulo,
      estado,
      dimension_objetivo,
      id_personaje_asignado,
      id_ubicacion_objetivo,
      prioridad,
      personaje_nombre: personaje ? personaje.name : "Desconocido",
      personaje_imagen: personaje ? personaje.image : null,
      ubicacion_nombre: ubicacion ? ubicacion.name : "Desconocida",
      ubicacion_dimension: ubicacion ? ubicacion.dimension : null,
    });
  } catch (error) {
    console.error("Error al actualizar misión:", error);
    res.status(500).json({ error: "Error al actualizar misión" });
  }
};

export const deleteMision = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MisionModel.deleteMisionFromDB(id);
    if (!deleted) return res.status(404).json({ message: "Misión no encontrada" });
    res.json({ message: "Misión eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar misión:", error);
    res.status(500).json({ error: "Error al eliminar misión" });
  }
};