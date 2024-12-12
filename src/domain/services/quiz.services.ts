import { config } from "../../config/config";
import { material } from "../entities/material.entity";
import { quiz, quizChapter } from "../entities/quiz.entity";
import { QuizRepository } from "../repositories/quiz.repository";

export class QuizService {
  constructor(private quizRepository: QuizRepository) {}

  async setCompleted(userId: string, chapterId: string): Promise<void> {
    const isCompleted = await this.quizRepository.isCompleted(
      userId,
      chapterId,
    );
    if (isCompleted) {
      throw new Error(`Chapter ${chapterId} already completed`);
    }
    await this.quizRepository.setCompleted(userId, chapterId);
  }

  async getCertificateUrl(userId: string): Promise<string> {
    const isCompletedAll = await this.quizRepository.isCompletedAll(userId);
    return this.quizRepository.getCertificateUrl(userId);
  }

  async getChapters(userId: string): Promise<quizChapter[]> {
    const chapters = await this.quizRepository.getChapters(userId);
    chapters.map((chapter) => {
      return (chapter.locked = false);
    });

    let isSubscribed = false;

    if (userId) {
      isSubscribed = await this.quizRepository.isSubscribed(userId);
    }

    if (!isSubscribed) {
      for (let i = config.FREE_LIMIT; i < chapters.length; i++) {
        chapters[i].locked = true;
      }
    }

    return chapters;
  }

  async getQuizz(chapterId: string): Promise<quiz[]> {
    const materials = await this.quizRepository.getMaterials(chapterId);
    const randomMaterials = materials
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    const quiz = randomMaterials.map((m: material) => {
      const wrongAnswers = randomMaterials
        .filter((mat) => mat.id !== m.id)
        .map((mat) => mat.title)
        .sort(() => Math.random() - 0.5)
        .slice(0, randomMaterials.length >= 4 ? 3 : randomMaterials.length - 1);

      const answers = [
        { id: "1", answer: m.title },
        ...wrongAnswers.map((answer, index) => ({
          id: (index + 2).toString(),
          answer,
        })),
      ].sort(() => Math.random() - 0.5);

      const correctAnswerIndex = answers.findIndex((a) => a.answer === m.title);

      return {
        id: m.id,
        question: m.visual_content_url,
        answers: answers,
        correctAnswerIndex: correctAnswerIndex,
      };
    });

    return quiz;
  }
}
