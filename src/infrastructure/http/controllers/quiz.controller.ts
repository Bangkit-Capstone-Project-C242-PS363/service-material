import type { Request, Response } from "express";
import { MaterialService } from "../../../domain/services/material.services";
import { QuizService } from "../../../domain/services/quiz.services";

export class QuizController {
  constructor(private quizService: QuizService) {}
  getChapters = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization?.split(".")[1];
    let userId;
    if (!!token) {
      const json = Buffer.from(token, "base64").toString("utf-8");
      userId = JSON.parse(json).userId;
    }
    try {
      const chapters = await this.quizService.getChapters(userId);
      const certificate_url = await this.quizService.getCertificateUrl(userId);
      res.json({
        error: false,
        message: "Chapter fetched successfully",
        certificate_url,
        data: chapters,
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
      const quizz = await this.quizService.getQuizz(req.params.chapterId);
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
