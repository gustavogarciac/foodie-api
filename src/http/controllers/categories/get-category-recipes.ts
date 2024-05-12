import { makeGetCategoryRecipes } from "@/use-cases/factories/make-get-category-recipes";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function getCategoryRecipesRoute(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get("/categories/:categoryId/products", {
      schema: {
        summary: "Get category recipes",
        tags: ['recipes', 'categories'],
        params: z.object({
          categoryId: z.string().uuid()
        }),
        response: {
          200: z.object({
            recipes: z.array(z.object({
              id: z.string().uuid(),
              name: z.string(),
              description: z.string(),
              price: z.number(),
              totalDiscount: z.number(),
              imageUrl: z.string(),
              slug: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
              categoryId: z.string().uuid()
            }))
          })
        }
      }
    }, async (req, reply) => {
      const { categoryId } = req.params

      const getCategoryRecipesUseCase = makeGetCategoryRecipes()

      const recipes = await getCategoryRecipesUseCase.execute({ categoryId })

      return reply.status(200).send({
        recipes: recipes.map(recipe => {
          return {
            id: recipe.id,
            name: recipe.name,
            description: recipe.description,
            price: Number(recipe.price.toString()),
            totalDiscount: recipe.totalDiscount,
            imageUrl: recipe.imageUrl,
            slug: recipe.slug,
            createdAt: recipe.createdAt,
            updatedAt: recipe.updatedAt,
            categoryId: recipe.categoryId
          }
        })
      })
    })
}