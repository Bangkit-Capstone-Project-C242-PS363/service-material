import { chapter, material } from "../../domain/entities/material.entity";
import { MaterialRepository } from "../../domain/repositories/material.repositories";
import { faker } from "@faker-js/faker";

export class InMemoryMaterialRepository implements MaterialRepository {
  private materials: material[] = Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    content: Array.from({ length: 3 }, () => faker.lorem.paragraph()),
    visualContentUrl: faker.image.url(),
  }));

  private chapters: chapter[] = Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    iconUrl: faker.image.url(),
  }));

  async getChapters(): Promise<chapter[]> {
    return this.chapters;
  }

  async getMaterials(chapterId: string): Promise<material[]> {
    return this.materials;
  }

  async getChapterImageUrl(chapterId: string): Promise<string> {
    return faker.image.url();
  }
}
