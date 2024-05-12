import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeDeleteRecipeUseCase } from "@/use-cases/factories/make-delete-recipe-use-case";

export async function deleteRecipeRoute(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .delete("/recipes/:id", {
      schema: {
        summary: "Delete a recipe",
        tags: ['recipes'],
        params: z.object({
          id: z.string().uuid()
        }),
        response: {
          201: z.object({
            message: z.string()
          })
        }
      }
    }, async (req, reply) => {
      const { 
        id
      } = req.params
    
      const deleteRecipeUseCase = makeDeleteRecipeUseCase()
    
      await deleteRecipeUseCase.execute({ recipeId: id })
    
      return reply.status(201).send({ message: "Recipe deleted successfuly." })
    })
}