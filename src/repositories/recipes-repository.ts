import { Recipe, Prisma } from "@prisma/client"

export interface RecipesRepository {
  create(data: Prisma.RecipeUncheckedCreateInput): Promise<Recipe>
  findBySlug(slug: string): Promise<Recipe | null>
  findByCategoryId(categoryId: string): Promise<Recipe[] | []>
  findById(id: string): Promise<Recipe | null>
  delete(id: string): Promise<null>
  update(data: Prisma.RecipeUncheckedCreateInput): Promise<Recipe | null>
}