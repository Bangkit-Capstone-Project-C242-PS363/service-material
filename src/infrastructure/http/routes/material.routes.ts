import { Router } from "express";

export const createMaterialRoutes = (): Router => {
  const router = Router();

  router.get("/getAll", (req, res) => {
    res.send("Hello World");
  });

  return router;
};
