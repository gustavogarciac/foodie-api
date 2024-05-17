import { Category, Prisma } from "@prisma/client";

export interface CategoriesRepository {
  create(data: Prisma.CategoryCreateInput): Promise<Category>
  findBySlug(slug: string): Promise<Category | null>
  findById(id: string): Promise<Category | null>
}