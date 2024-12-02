import { Router } from "express";

export const createMaterialRoutes = (): Router => {
  const router = Router();

  router.get("/getChapters", (req, res) => {
    res.send("Hello World");
  });

  router.get("/getMaterial", (req, res) => {
    res.send("Hello World");
  });

  return router;
};
