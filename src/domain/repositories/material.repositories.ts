import { materialChapter } from "../entities/material.entity";

export interface MaterialRepository {
  getChapters(): Promise<materialChapter[]>;
  getMaterials(chapterId: string): Promise<any>;
  getChapterImageUrl(chapterId: string): Promise<string>;
  isSubscribed(userId: string): Promise<boolean>;
}
