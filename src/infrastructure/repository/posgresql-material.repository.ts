import { Pool } from "pg";
import { MaterialRepository } from "../../domain/repositories/material.repositories";
import { config } from "../../config/config";
import { chapter, material } from "../../domain/entities/material.entity";

export class PosgresMaterialRepository implements MaterialRepository {
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

  async getChapters(): Promise<chapter[]> {
    const query = "SELECT id, title, icon_url FROM chapters";
    try {
      const { rows } = await this.pool.query(query);
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
