import express from "express";
import { createMaterialRoutes } from "./infrastructure/http/routes/material.routes";

const app = express();
app.use(express.json());

app.use("/materials", createMaterialRoutes());

export default app;
