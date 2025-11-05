import express from "express";
import dotenv from "dotenv";
import { specs, swaggerDocs } from "./config/swagger.js";
import arbitrosRoutes from "./routes/arbitrosRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { containerInfo } from "./utils/container.js";

dotenv.config();

const app = express();
app.use(express.json());

// Health & utilities
app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "arbitros-api", time: new Date().toISOString() });
});

// Endpoint para verificar contenedor/hostname (útil para el taller)
app.get("/api/whoami", (req, res) => {
  res.json(containerInfo());
});

// Rutas del dominio Árbitros
app.use("/api", arbitrosRoutes);

// Swagger UI
swaggerDocs(app);

// Manejo centralizado de errores
app.use(errorHandler);

export default app;