import { FastifyInstance } from "fastify";
import { createRecipeRoute } from "./create-recipe";

export async function recipesRoutes(app: FastifyInstance) {
  app.register(createRecipeRoute) 
}