import { chapter, material } from "../entities/material.entity";
import { quiz } from "../entities/quiz.entity";
import { MaterialRepository } from "../repositories/material.repositories";

export class MaterialService {
  constructor(private materialRepository: MaterialRepository) {}

  async getChapters(): Promise<chapter[]> {
    return this.materialRepository.getChapters();
  }

  async getMaterials(chapterId: string): Promise<material[]> {
    const materials = await this.materialRepository.getMaterials(chapterId);

    materials.sort((a: material, b: material) => a.id > b.id);
    console.log(materials);
    return materials.map((m: any) => {
      if (typeof m.content === "string") {
        return {
          ...m,
          content: m.content.split("\n"),
        };
      }
      return m;
    });
  }

  async getChapterImageUrl(chapterId: string): Promise<string> {
    return this.materialRepository.getChapterImageUrl(chapterId);
  }

  async getQuizz(chapterId: string): Promise<quiz[]> {
    const materials = await this.materialRepository.getMaterials(chapterId);
    const quiz = materials.map((m: material) => {
      const wrongAnswers = materials
        .filter((mat) => mat.id !== m.id)
        .map((mat) => mat.title)
        .sort(() => Math.random() - 0.5)
        .slice(0, materials.length >= 4 ? 3 : materials.length - 1);

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

    console.log(materials);
    return quiz;
  }
}
