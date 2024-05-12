import { Prisma } from "@prisma/client";
import { RecipesRepository } from "../recipes-repository";
import { prisma } from "@/lib/prismadb";

export class PrismaRecipesRepository implements RecipesRepository {
  async create(data: Prisma.RecipeUncheckedCreateInput) {
    const {
      categoryId,
      description,
      imageUrl,
      name,
      price,
      slug,
      totalDiscount,
    } = data

    const recipe = await prisma.recipe.create({
      data: {
        description,
        imageUrl,
        name,
        price,
        slug,
        totalDiscount, 
        category: {
          connect: {
            id: data.categoryId
          }
        },
      }
    })

    return recipe
  }

  async findBySlug(slug: string) {
    const recipe = await prisma.recipe.findUnique({
      where: {
        slug
      }
    })

    if (!recipe) {
      return null
    }

    return recipe
  }

  async findByCategoryId(categoryId: string) {
    const recipe = await prisma.recipe.findMany({
      where: {
        categoryId
      }
    })

    return recipe
  }
}