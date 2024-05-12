import { Prisma, Recipe } from "@prisma/client";
import { RecipesRepository } from "../recipes-repository";
import { randomUUID } from "crypto";
import { generateSlug } from "@/utils/generate-slug";
import { Decimal } from "@prisma/client/runtime/library";

export class InMemoryRecipesRepository implements RecipesRepository {
  public recipes: Recipe[] = [];
  
  async create(data: Prisma.RecipeUncheckedCreateInput) {
    const slug = generateSlug(data.name)

    const recipe = {
      id: data.id ?? randomUUID(),
      name: data.name ?? 'in-memory-recipe',
      description: data.description ?? "in-memory-description",
      price: new Decimal(data.price.toString() ?? '10'),
      totalDiscount: data.totalDiscount ?? 5,
      imageUrl: data.imageUrl ?? 'https://example.com/image.jpg',
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
      categoryId: data.categoryId ?? randomUUID()
    }
    this.recipes.push(recipe)
    return recipe
  }

  async findBySlug(slug: string) {
    const recipe = this.recipes.find(recipe => recipe.slug === slug)

    if(!recipe) return null
    
    return recipe
  }

  async findByCategoryId(categoryId: string) {
    const recipe = this.recipes.filter(recipe => recipe.categoryId === categoryId)
    return recipe
  }
}