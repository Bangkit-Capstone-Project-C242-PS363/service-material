import type { Request, Response } from "express";
import { MaterialService } from "../../../domain/services/material.services";

export class MaterialController {
  constructor(private materialService: MaterialService) {}

  setBookmark = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization?.split(".")[1];
    let userId;
    if (!!token) {
      const json = Buffer.from(token, "base64").toString("utf-8");
      userId = JSON.parse(json).userId;
    }

    try {
      await this.materialService.setBookmark(userId, req.body.chapter_id);
      res.json({
        error: false,
        message: "Bookmark set successfully",
      });
    } catch (error) {
      res.json({
        error: true,
        message: error.message,
      });
    }
  };

  removeBookmark = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization?.split(".")[1];
    let userId;
    if (!!token) {
      const json = Buffer.from(token, "base64").toString("utf-8");
      userId = JSON.parse(json).userId;
    }

    try {
      await this.materialService.deleteBookmark(userId, req.body.chapter_id);
      res.json({
        error: false,
        message: "Bookmark deleted successfully",
      });
    } catch (error) {
      res.json({
        error: true,
        message: error.message,
      });
    }
  };

  getChapters = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization?.split(".")[1];
    let userId;
    if (!!token) {
      const json = Buffer.from(token, "base64").toString("utf-8");
      userId = JSON.parse(json).userId;
    }

    try {
      const chapters = await this.materialService.getChapters(userId);
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
