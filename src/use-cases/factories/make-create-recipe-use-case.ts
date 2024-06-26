import { PrismaRecipesRepository } from "@/repositories/prisma/prisma-recipes-repository";
import { CreateRecipeUseCase } from "../recipes/create-recipe";

export function makeCreateRecipeUseCase() {
  const recipesRepository = new PrismaRecipesRepository();
  const useCase = new CreateRecipeUseCase(recipesRepository);

  return useCase
}