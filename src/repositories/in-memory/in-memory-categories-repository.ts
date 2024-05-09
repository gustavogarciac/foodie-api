import { Category, Prisma } from "@prisma/client";
import { CategoriesRepository } from "../categories-repository";
import { generateSlug } from "@/utils/generate-slug";
import { randomUUID } from "crypto";

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public categories: Category[] = [];
  async create(data: Prisma.CategoryCreateInput) {
    const slug = generateSlug(data.name)

    const category = {
      id: data.id ?? randomUUID(),
      name: data.name ?? 'in-memory-category',
      slug,
    }

    this.categories.push(category)
    return category
  }

  async findBySlug(slug: string) {
    const category = this.categories.find(category => category.slug === slug)

    if(!category) return null
    
    return category
  }
}