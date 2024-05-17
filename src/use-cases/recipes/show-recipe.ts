import { RecipesRepository } from "@/repositories/recipes-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { CategoriesRepository } from "@/repositories/categories-repository";

interface ShowRecipeUseCaseParams {
  recipeId: string
}

export class ShowRecipeUseCase {
  constructor(private recipesRepository: RecipesRepository, private categoriesRepository: CategoriesRepository) {}

  async execute({
    recipeId
  }: ShowRecipeUseCaseParams) {
    const recipe = await this.recipesRepository.findById(recipeId);

    if(!recipe) {
      throw new ResourceNotFoundError("Recipe");
    }
    
    const category = await this.categoriesRepository.findById(recipe.categoryId);

    if(!category) {
      throw new ResourceNotFoundError("Category")
    }

    return {
      ...recipe,
      category
    };
  }
}