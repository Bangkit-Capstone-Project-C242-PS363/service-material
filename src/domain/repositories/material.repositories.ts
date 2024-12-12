import { materialChapter } from "../entities/material.entity";

export interface MaterialRepository {
  getChapters(userId: string): Promise<materialChapter[]>;
  getMaterials(chapterId: string): Promise<any>;
  getChapterImageUrl(chapterId: string): Promise<string>;
  isSubscribed(userId: string): Promise<boolean>;
  setBookmark(userId: string, chapterId: string): Promise<void>;
  deleteBookmark(userId: string, chapterId: string): Promise<void>;
}
