import { RecipesRepository } from "@/repositories/recipes-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteRecipeUseCaseParams {
  recipeId: string
}

export class DeleteRecipeUseCase {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute({
    recipeId
  }: DeleteRecipeUseCaseParams) {
    const recipe = await this.recipesRepository.findById(recipeId);

    if(!recipe) {
      throw new ResourceNotFoundError("Recipe");
    }

    return this.recipesRepository.delete(recipeId);
  }
}