import { Router } from "express";
import { MaterialController } from "../controllers/material.controller";
import { QuizController } from "../controllers/quiz.controller";

export const createQuizRoutes = (quizController: QuizController): Router => {
  const router = Router();

  router.get("/getChapters", quizController.getChapters);
  router.get("/getQuizz/:chapterId", quizController.getQuizz);

  return router;
};
