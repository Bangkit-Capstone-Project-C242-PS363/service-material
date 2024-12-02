import { Router } from "express";
import { MaterialController } from "../controllers/material.controller";

export const createQuizRoutes = (
  materialController: MaterialController,
): Router => {
  const router = Router();

  router.get("/getChapters", materialController.getChapters);
  router.get("/getMaterials/:chapterId", materialController.getMaterials);

  return router;
};
