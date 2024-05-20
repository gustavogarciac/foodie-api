import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeSearchRecipeUseCase } from "@/use-cases/factories/make-search-recipe-use-case";

export async function searchRecipeRoute(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get("/recipes", {
      schema: {
        summary: "Delete a recipe",
        tags: ['recipes'],
        querystring: z.object({
          query: z.string().nullable(),
          page: z.string().nullish().default("1").transform(Number)
        }),
      }
    }, async (req, reply) => {

      const { 
        page,
        query
      } = req.query
    
      const searchRecipeUseCase = makeSearchRecipeUseCase()
    
      const recipes = await searchRecipeUseCase.execute({ page, query })
    
      return reply.status(201).send({ ...recipes })
    })
}