import { chapter, material } from "../../domain/entities/material.entity";
import { MaterialRepository } from "../../domain/repositories/material.repositories";

export class InMemoryMaterialRepository implements MaterialRepository {
  private materials: material[] = [];
  private chapters: chapter[] = [];

  async getChapters(): Promise<chapter[]> {
    return this.chapters;
  }

  async getMaterials(chapterId: string): Promise<material[]> {
    return this.materials;
  }
}
