import type { Request, Response } from "express";
import { MaterialService } from "../../../domain/services/material.services";

export class MaterialController {
  constructor(private materialService: MaterialService) {}
  getChapters = async (req: Request, res: Response): Promise<void> => {
    try {
      const chapters = await this.materialService.getChapters();
      res.json({
        message: "Chapter fetched successfully",
        chapters,
      });
    } catch (error) {
      res.json({
        error: error.message,
      });
    }
  };

  getMaterials = async (req: Request, res: Response): Promise<void> => {
    try {
      const materials = await this.materialService.getMaterials(
        req.params.chapterId,
      );
      const chapterImageUrl = await this.materialService.getChapterImageUrl(
        req.params.chapterId,
      );
      res.json({
        message: "Materials fetched successfully",
        chapterId: req.params.chapterId,
        chapterImageUrl,
        materials,
      });
    } catch (error) {
      res.json({
        error: error.message,
      });
    }
  };
}
