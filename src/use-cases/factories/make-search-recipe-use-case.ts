import { PrismaRecipesRepository } from "@/repositories/prisma/prisma-recipes-repository";
import { SearchRecipeUseCase } from "../recipes/search-recipe";

export function makeSearchRecipeUseCase() {
  const recipesRepository = new PrismaRecipesRepository();
  const useCase = new SearchRecipeUseCase(recipesRepository);

  return useCase
}