import { Prisma } from "@prisma/client";
import { RecipesRepository } from "../recipes-repository";
import { prisma } from "@/lib/prismadb";
import { generateSlug } from "@/utils/generate-slug";

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

  async findById(id: string) {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id
      }
    })

    if(!recipe) return null

    return recipe
  }

  async delete(id: string) {
    await prisma.recipe.delete({
      where: {
        id
      }
    })

    return null
  }

  async update(data: Prisma.RecipeUncheckedCreateInput) {
    const recipeToBeUpdated = await prisma.recipe.findUnique({
      where: {
        id: data.id
      }
    })

    if(!recipeToBeUpdated) {
      return null
    }

    const updatedData = {
      categoryId: data.categoryId ?? recipeToBeUpdated.categoryId,
      description: data.description ?? recipeToBeUpdated.description,
      imageUrl: data.imageUrl ?? recipeToBeUpdated.imageUrl,
      name: data.name ?? recipeToBeUpdated.name,
      price: data.price ?? recipeToBeUpdated.price,
      slug: generateSlug(data.name) ?? recipeToBeUpdated.slug,
      totalDiscount: data.totalDiscount ?? recipeToBeUpdated.totalDiscount,
    }

    const updatedRecipe = await prisma.recipe.update({
      where: {
        id: data.id
      },
      data: updatedData
    })

    return updatedRecipe
  }
}