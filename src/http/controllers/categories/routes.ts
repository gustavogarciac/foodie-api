import { FastifyInstance } from "fastify";
import { createCategoryRoute } from "./create-category";

export async function categoriesRoutes(app: FastifyInstance) {
  app.register(createCategoryRoute)
}