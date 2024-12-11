import express from "express";
import { createMaterialRoutes } from "./infrastructure/http/routes/material.routes";
import { MaterialController } from "./infrastructure/http/controllers/material.controller";
import { MaterialService } from "./domain/services/material.services";
import { InMemoryMaterialRepository } from "./infrastructure/repository/in-memory-material.repository";
import { createQuizRoutes } from "./infrastructure/http/routes/quiz.routes";
import { PosgresMaterialRepository } from "./infrastructure/repository/posgresql-material.repository";
import { QuizService } from "./domain/services/quiz.services";
import { QuizController } from "./infrastructure/http/controllers/quiz.controller";

const app = express();
app.use(express.json());

// const materialRepository = new InMemoryMaterialRepository();
const materialRepository = new PosgresMaterialRepository();
const materialService = new MaterialService(materialRepository);
const materialController = new MaterialController(materialService);
app.use("/materials", createMaterialRoutes(materialController));

const quizService = new QuizService(materialRepository);
const quizController = new QuizController(quizService);
app.use("/quiz", createQuizRoutes(quizController));

export default app;
