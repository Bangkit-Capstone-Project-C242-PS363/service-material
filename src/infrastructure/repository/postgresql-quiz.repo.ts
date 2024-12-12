import { Pool } from "pg";
import { config } from "../../config/config";
import { material } from "../../domain/entities/material.entity";
import { quizChapter } from "../../domain/entities/quiz.entity";
import { QuizRepository } from "../../domain/repositories/quiz.repository";

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

  async isCompletedAll(userId: string): Promise<boolean> {
    const query = `SELECT COUNT(*) as total_chapters FROM chapters`;
    const query2 = `SELECT COUNT(*) as completed_chapters FROM completed_quiz WHERE user_id = $1`;
    try {
      const { rows: rows1 } = await this.pool.query(query);
      const { rows: rows2 } = await this.pool.query(query2, [userId]);
      console.log(rows1, rows2);
      if (rows1.length === 0 || rows2.length === 0) {
        return Promise.resolve(false);
      }
      return rows1[0].total_chapters === rows2[0].completed_chapters;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async setCompleted(userId: string, chapterId: string): Promise<void> {
    const query = `INSERT INTO completed_quiz (user_id, chapter_id) VALUES ($1, $2)`;
    try {
      await this.pool.query(query, [userId, chapterId]);
    } catch (error) {
      throw new Error(error.message);
    }
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
