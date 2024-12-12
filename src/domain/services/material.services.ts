import { config } from "../../config/config";
import { materialChapter, material } from "../entities/material.entity";
import { quiz } from "../entities/quiz.entity";
import { MaterialRepository } from "../repositories/material.repositories";

export class MaterialService {
  constructor(private materialRepository: MaterialRepository) {}

  async setBookmark(userId: string, chapterId: string): Promise<void> {
    await this.materialRepository.setBookmark(userId, chapterId);
  }

  async deleteBookmark(userId: string, chapterId: string): Promise<void> {
    await this.materialRepository.deleteBookmark(userId, chapterId);
  }

  async getChapters(): Promise<materialChapter[]> {
    const chapters = await this.materialRepository.getChapters();
    chapters.map((chapter) => {
      return (chapter.locked = false);
    });
    return chapters;
  }

  async getMaterials(chapterId: string): Promise<material[]> {
    const materials = await this.materialRepository.getMaterials(chapterId);

    materials.sort((a: material, b: material) => a.id > b.id);
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
}
