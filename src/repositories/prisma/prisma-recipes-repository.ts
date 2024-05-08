import { Prisma } from "@prisma/client";
import { RecipesRepository } from "../recipes-repository";
import { prisma } from "@/lib/prismadb";

export class PrismaRecipesRepository implements RecipesRepository {
  async create(data: Prisma.RecipeCreateInput) {
    const recipe = await prisma.recipe.create({
      data
    })

    return recipe
  }
}