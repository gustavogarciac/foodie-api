import { RecipesRepository } from "@/repositories/recipes-repository";
import { Prisma } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdateRecipeUseCaseParams {
  recipeId: string
  data: Prisma.RecipeUncheckedCreateInput
}

export class UpdateRecipeUseCase {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute({ data, recipeId }: UpdateRecipeUseCaseParams) {
    const recipeToBeUpdated = await this.recipesRepository.findById(recipeId);

    if(!recipeToBeUpdated) {
      throw new ResourceNotFoundError("Recipe")
    }
  
    return this.recipesRepository.update(data)
  }
}