import express from "express";
import { createMaterialRoutes } from "./infrastructure/http/routes/material.routes";
import { MaterialController } from "./infrastructure/http/controllers/material.controller";
import { MaterialService } from "./domain/services/material.services";

const app = express();
app.use(express.json());

const materialService = new MaterialService();
const materialController = new MaterialController(materialService);
app.use("/materials", createMaterialRoutes(materialController));

export default app;
