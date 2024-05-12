import { PrismaRecipesRepository } from "@/repositories/prisma/prisma-recipes-repository";
import { DeleteRecipeUseCase } from "../recipes/delete-recipe";

export function makeDeleteRecipeUseCase() {
  const recipesRepository = new PrismaRecipesRepository();
  const useCase = new DeleteRecipeUseCase(recipesRepository);

  return useCase
}