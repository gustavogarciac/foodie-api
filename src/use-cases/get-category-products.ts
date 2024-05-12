import { RecipesRepository } from "@/repositories/recipes-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetCategoryProcutsUseCaseParams {
  categoryId: string
}

export class GetCategoryProcutsUseCase {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute({ categoryId} : GetCategoryProcutsUseCaseParams) {
    const products = await this.recipesRepository.findByCategoryId(categoryId)

    if(!products) return []

    return products
  }
}