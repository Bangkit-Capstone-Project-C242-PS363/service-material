import express from "express";
import { createMaterialRoutes } from "./infrastructure/http/routes/material.routes";
import { MaterialController } from "./infrastructure/http/controllers/material.controller";
import { MaterialService } from "./domain/services/material.services";
import { createQuizRoutes } from "./infrastructure/http/routes/quiz.routes";
import { PosgresMaterialRepository } from "./infrastructure/repository/posgresql-material.repository";
import { QuizService } from "./domain/services/quiz.services";
import { QuizController } from "./infrastructure/http/controllers/quiz.controller";
import { PostgresQuizRepository } from "./infrastructure/repository/postgresql-quiz.repo";

const app = express();
app.use(express.json());

const materialRepository = new PosgresMaterialRepository();
const materialService = new MaterialService(materialRepository);
const materialController = new MaterialController(materialService);
app.use("/materials", createMaterialRoutes(materialController));

const quizRepository = new PostgresQuizRepository();
const quizService = new QuizService(quizRepository);
const quizController = new QuizController(quizService);
app.use("/quiz", createQuizRoutes(quizController));

export default app;
