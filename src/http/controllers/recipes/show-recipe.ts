import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeShowRecipeUseCase } from "@/use-cases/factories/make-show-recipe-use-case";

export async function showRecipeRoute(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get("/recipes/:id", {
      schema: {
        summary: "Show a recipe",
        tags: ['recipes'],
        params: z.object({
          id: z.string().uuid()
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            name: z.string(),
            description: z.string(),
            price: z.number(),
            totalDiscount: z.number(),
            imageUrl: z.string(),
            slug: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
            category: z.object({
              id: z.string().uuid(),
              name: z.string(),
              slug: z.string(),
            })
          })
        }
      }
    }, async (req, reply) => {
      const { 
        id
      } = req.params

      const showRecipeUseCase = makeShowRecipeUseCase()

      const recipe = await showRecipeUseCase.execute({ recipeId: id })

      return reply.status(200).send({
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        price: Number(recipe.price.toString()),
        totalDiscount: recipe.totalDiscount,
        imageUrl: recipe.imageUrl,
        slug: recipe.slug,
        createdAt: recipe.createdAt,
        updatedAt: recipe.updatedAt,
        category: {
          id: recipe.category.id,
          name: recipe.category.name,
          slug: recipe.category.slug,
        }
      })
    })
}