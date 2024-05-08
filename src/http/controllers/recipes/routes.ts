import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import { createRecipe } from "./create-recipe";

export async function recipesRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post("/recipes", {
      schema: {
        summary: "Create a new recipe",
        tags: ['recipes'],
        body: z.object({
          name: z.string().min(3).max(150),
          description: z.string().min(3).max(500),
          price: z.number().min(1),
          totalDiscount: z.number().default(0),
          imageUrl: z.string().url(),
          categoryId: z.string().uuid()
        }),
        response: {
          201: z.object({
            recipeId: z.string().uuid()
          })
        }
      }
    }, createRecipe)
}