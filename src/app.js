import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import misionRoutes from "./routes/mision.routes.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Rutas API
app.use("/api", misionRoutes);

// Ruta absoluta al frontend compilado
const frontendPath = path.join(__dirname, "../public");

// Servir archivos estáticos si existen
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));

  // Redirigir todas las rutas que no sean /api al index.html
  app.get(/^(?!\/api).*/, (req, res) => {
    const indexPath = path.join(frontendPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send(`
        <h1>Frontend no encontrado</h1>
        <p>El archivo <code>index.html</code> no existe.</p>
        <p>Ejecuta <code>yarn build</code> en el proyecto frontend y copia el resultado a <code>/public</code>.</p>
      `);
    }
  });
} else {
  // Si no existe la carpeta public
  app.get("*", (req, res) => {
    res.status(404).send(`
      <h1>Frontend no disponible</h1>
      <p>No se encontró la carpeta <code>public/</code>.</p>
      <p>Ejecuta <code>yarn build</code> en el frontend y mueve los archivos a <code>rick-y-morty-backend/public</code>.</p>
    `);
  });
}

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

export default app;