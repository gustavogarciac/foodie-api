import { Recipe, Prisma } from "@prisma/client"

export interface RecipesRepository {
  create(data: Prisma.RecipeCreateInput): Promise<Recipe>
}