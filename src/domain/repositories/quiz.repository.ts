import { quizChapter } from "../entities/quiz.entity";

export interface QuizRepository {
  getChapters(userId: string): Promise<quizChapter[]>;
  getCertificateUrl(userId: string): Promise<string>;
  setCertificateUrl(userId: string, url: string): Promise<void>;
  getUsername(userId: string): Promise<string>;
  getMaterials(chapterId: string): Promise<any>;
  getChapterImageUrl(chapterId: string): Promise<string>;
  setCompleted(userId: string, chapterId: string): Promise<void>;
  isCompleted(userId: string, chapterId: string): Promise<boolean>;
  isCompletedAll(userId: string): Promise<boolean>;
  isSubscribed(userId: string): Promise<boolean>;
}
