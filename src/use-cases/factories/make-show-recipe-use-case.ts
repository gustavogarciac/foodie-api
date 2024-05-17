import { PrismaRecipesRepository } from "@/repositories/prisma/prisma-recipes-repository";
import { DeleteRecipeUseCase } from "../recipes/delete-recipe";
import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { ShowRecipeUseCase } from "../recipes/show-recipe";

export function makeShowRecipeUseCase() {
  const recipesRepository = new PrismaRecipesRepository();
  const categoriesRepository = new PrismaCategoriesRepository();
  const useCase = new ShowRecipeUseCase(recipesRepository, categoriesRepository);

  return useCase
}