import { Router } from "express";
import { MaterialController } from "../controllers/material.controller";

export const createMaterialRoutes = (
  materialController: MaterialController,
): Router => {
  const router = Router();

  router.get("/getChapters", materialController.getChapters);
  router.get("/getMaterials", materialController.getMaterials);

  return router;
};
