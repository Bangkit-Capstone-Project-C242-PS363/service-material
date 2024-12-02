import type { Request, Response } from "express";
import { MaterialService } from "../../../domain/services/material.services";

export class MaterialController {
  constructor(private materialService: MaterialService) {}
  getChapters = async (req: Request, res: Response): Promise<void> => {
    try {
      const materials = await this.materialService.getChapters();
      res.json({
        message: "Chapter fetched successfully",
        materials,
      });
    } catch (error) {
      res.json({
        error: error.message,
      });
    }
  };

  getMaterials = async (req: Request, res: Response): Promise<void> => {
    res.json({
      message: "this is materials",
    });
  };
}
