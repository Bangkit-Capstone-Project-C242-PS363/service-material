import { chapter, material } from "../entities/material.entity";

export interface MaterialRepository {
  getChapters(): Promise<chapter[]>;
  getMaterials(chapterId: string): Promise<material[]>;
  getChapterImageUrl(chapterId: string): Promise<string>;
}
