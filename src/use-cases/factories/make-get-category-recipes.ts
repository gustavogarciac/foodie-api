import { PrismaRecipesRepository } from "@/repositories/prisma/prisma-recipes-repository";
import { GetCategoryProductsUseCase } from "../categories/get-category-products";

export function makeGetCategoryRecipes() {
  const recipesRepository = new PrismaRecipesRepository();
  const useCase = new GetCategoryProductsUseCase(recipesRepository);

  return useCase
}