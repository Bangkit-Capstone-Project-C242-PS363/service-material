export class MaterialService {
  constructor(private materialRepository: materialRepository) {}

  async getChapters(): Promise<string> {
    return this.materialRepository.getChapters();
  }
}
