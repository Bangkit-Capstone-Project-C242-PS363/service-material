import { chapter, material } from "../entities/material.entity";
import { MaterialRepository } from "../repositories/material.repositories";

export class MaterialService {
  constructor(private materialRepository: MaterialRepository) {}

  async getChapters(): Promise<chapter[]> {
    return this.materialRepository.getChapters();
  }

  async getMaterials(chapterId: string): Promise<material[]> {
    return this.materialRepository.getMaterials(chapterId);
  }
}
