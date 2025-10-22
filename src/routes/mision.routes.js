import express from "express";
import axios from "axios";
import {
  getMisiones,
  createMision,
  updateMision,
  deleteMision,
} from "../controllers/mision.controller.js";

const router = express.Router();

router.get("/misiones", getMisiones);
router.post("/misiones", createMision);
router.put("/misiones/:id", updateMision);
router.delete("/misiones/:id", deleteMision);
router.get("/characters/all", async (req, res) => {
  try {
    let all = [];
    let nextUrl = "https://rickandmortyapi.com/api/character";
    console.log("🌀 Cargando personajes de Rick & Morty...");

    while (nextUrl) {
      const { data } = await axios.get(nextUrl);
      all = [...all, ...data.results];
      nextUrl = data.info.next;
    }

    console.log(`✅ Total personajes obtenidos: ${all.length}`);
    res.json(all);
  } catch (err) {
    console.error("❌ Error al obtener todos los personajes:", err.message);
    res.status(500).json({ error: "Error al obtener todos los personajes" });
  }
});

export default router;