import { FastifyInstance } from "fastify";
import { createRecipeRoute } from "./create-recipe";
import { deleteRecipeRoute } from "./delete-recipe";
import { showRecipeRoute } from "./show-recipe";

export async function recipesRoutes(app: FastifyInstance) {
  app.register(createRecipeRoute) 
  app.register(deleteRecipeRoute)
  app.register(showRecipeRoute)
}