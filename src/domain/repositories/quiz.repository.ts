import { quizChapter } from "../entities/quiz.entity";

export interface QuizRepository {
  getChapters(userId: string): Promise<quizChapter[]>;
  getCertificateUrl(userId: string): Promise<string>;
  getMaterials(chapterId: string): Promise<any>;
  getChapterImageUrl(chapterId: string): Promise<string>;
  setCompleted(userId: string, chapterId: string): Promise<void>;
  isCompletedAll(userId: string): Promise<boolean>;
  isSubscribed(userId: string): Promise<boolean>;
}
