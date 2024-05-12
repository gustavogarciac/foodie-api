import { RecipesRepository } from "@/repositories/recipes-repository";

interface GetCategoryProductsUseCaseParams {
  categoryId: string
}

export class GetCategoryProductsUseCase {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute({ categoryId} : GetCategoryProductsUseCaseParams) {
    const products = await this.recipesRepository.findByCategoryId(categoryId)

    if(!products) return []

    return products
  }
}