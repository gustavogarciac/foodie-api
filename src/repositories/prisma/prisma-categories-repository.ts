import { Prisma } from "@prisma/client";
import { CategoriesRepository } from "../categories-repository";
import { generateSlug } from "@/utils/generate-slug";
import { prisma } from "@/lib/prismadb";

export class PrismaCategoriesRepository implements CategoriesRepository {
  async create(data: Prisma.CategoryCreateInput) {
    const { name } = data
    
    const slug = generateSlug(name)

    const category = await prisma.category.create({
      data: {
        name,
        slug
      }
    })

    return category
  }

  async findBySlug(slug: string) {
    const category = await prisma.category.findFirst({
      where: {
        slug
      }
    })

    return category
  }

  async findById(id: string) {
    const category = await prisma.category.findFirst({
      where: {
        id
      }
    })

    return category
  }
}