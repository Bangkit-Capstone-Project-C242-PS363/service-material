import type { Request, Response } from "express";
import { MaterialService } from "../../../domain/services/material.services";

export class MaterialController {
  constructor(private materialService: MaterialService) {}

  getChapters = async (req: Request, res: Response): Promise<void> => {
    try {
      const chapters = await this.materialService.getChapters();
      res.json({
        error: false,
        message: "Chapter fetched successfully",
        data: chapters,
      });
    } catch (error) {
      res.json({
        error: true,
        message: error.message,
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
        error: false,
        message: "Materials fetched successfully",
        data: {
          chapterId: req.params.chapterId,
          chapterImageUrl,
          materials,
        },
      });
    } catch (error) {
      res.json({
        error: true,
        message: error.message,
      });
    }
  };

  getQuizz = async (req: Request, res: Response): Promise<void> => {
    try {
      const quizz = await this.materialService.getQuizz(req.params.chapterId);
      res.json({
        error: false,
        message: "Quizz fetched successfully",
        data: quizz,
      });
    } catch (error) {
      res.json({
        error: true,
        message: error.message,
      });
    }
  };
}
