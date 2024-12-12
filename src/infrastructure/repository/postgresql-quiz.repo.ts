import { Pool } from "pg";
import { config } from "../../config/config";
import { material } from "../../domain/entities/material.entity";
import { QuizRepository } from "../../domain/repositories/quiz.repository";
import { quizChapter } from "../../domain/entities/quiz.entity";

export class PostgresQuizRepository implements QuizRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: config.DB_USER,
      host: config.DB_HOST,
      database: config.DB_NAME,
      password: config.DB_PASSWORD,
      port: config.DB_PORT,
    });
  }

  async getCertificateUrl(userId: string): Promise<string> {
    const query = "SELECT certificate_url FROM certificates WHERE user_id = $1";
    try {
      const { rows } = await this.pool.query(query, [userId]);
      if (rows.length === 0) {
        return "";
      }
      return rows[0].certificate_url;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getChapters(userId: string): Promise<quizChapter[]> {
    const query = `
SELECT 
    c.id,
    c.title,
    c.icon_url,
    CASE 
        WHEN cq.chapter_id IS NOT NULL THEN true 
        ELSE false 
    END as completed
FROM chapters c
LEFT JOIN completed_quiz cq 
    ON c.id = cq.chapter_id 
    AND cq.user_id = $1
      `;
    try {
      const { rows } = await this.pool.query(query, [userId]);
      rows.sort((a: material, b: material) => a.id > b.id);
      return rows;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getMaterials(chapterId: string): Promise<any> {
    const query =
      "SELECT id, title, content, visual_content_url FROM materials WHERE chapter_id = $1";
    try {
      const { rows } = await this.pool.query(query, [chapterId]);
      return rows;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getChapterImageUrl(chapterId: string): Promise<string> {
    const query = "SELECT icon_url FROM chapters WHERE id = $1";
    try {
      const { rows } = await this.pool.query(query, [chapterId]);
      return rows[0].icon_url;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async isSubscribed(userId: string): Promise<boolean> {
    const query = "SELECT * FROM subscribe WHERE userid = $1";
    try {
      const { rows } = await this.pool.query(query, [userId]);
      return rows.length > 0;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
