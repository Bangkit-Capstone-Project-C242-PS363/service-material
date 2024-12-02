import type { Request, Response } from "express";

export class MaterialController {
  getChapters = async (req: Request, res: Response): Promise<void> => {
    res.json({
      message: "This is chapters",
    });
  };

  getMaterials = async (req: Request, res: Response): Promise<void> => {
    res.json({
      message: "this is materials",
    });
  };
}
