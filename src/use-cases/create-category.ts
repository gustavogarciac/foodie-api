import { CategoriesRepository } from "@/repositories/categories-repository";
import { generateSlug } from "@/utils/generate-slug";
import { CategoryAlreadyExistsError } from "./errors/category-already-exists";

interface CreateCategoryUseCaseParams {
  name: string
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(data: CreateCategoryUseCaseParams) {
    const slug = generateSlug(data.name)

    const categoryAlreadyExists = await this.categoriesRepository.findBySlug(slug);

    if(categoryAlreadyExists) {
      throw new CategoryAlreadyExistsError();
    }

    return this.categoriesRepository.create({ name: data.name, slug });
  }
}