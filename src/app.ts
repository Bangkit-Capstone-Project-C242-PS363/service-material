import express from "express";
import { createMaterialRoutes } from "./infrastructure/http/routes/material.routes";
import { MaterialController } from "./infrastructure/http/controllers/material.controller";

const app = express();
app.use(express.json());

const materialController = new MaterialController();
app.use("/materials", createMaterialRoutes(materialController));

export default app;
