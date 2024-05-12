import { Recipe, Prisma } from "@prisma/client"

export interface RecipesRepository {
  create(data: Prisma.RecipeUncheckedCreateInput): Promise<Recipe>
  findBySlug(slug: string): Promise<Recipe | null>
  findByCategoryId(categoryId: string): Promise<Recipe[] | []>
}