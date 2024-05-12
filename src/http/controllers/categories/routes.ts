import { FastifyInstance } from "fastify";
import { createCategoryRoute } from "./create-category";
import { getCategoryRecipesRoute } from "./get-category-recipes";

export async function categoriesRoutes(app: FastifyInstance) {
  app.register(createCategoryRoute)
  app.register(getCategoryRecipesRoute)
}