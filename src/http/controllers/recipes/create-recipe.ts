import { CreateRecipeUseCase } from "@/use-cases/create-recipe";
import { makeCreateRecipeUseCase } from "@/use-cases/factories/make-create-recipe-use-case";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function createRecipeRoute(app: FastifyInstance) {
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
    }, async (req, reply) => {
      const { 
        name, 
        description, 
        price, 
        totalDiscount, 
        imageUrl, 
        categoryId 
      } = req.body
    
      const createRecipeUseCase = makeCreateRecipeUseCase()
    
      const recipe = await createRecipeUseCase.execute({
        name,
        description,
        price,
        totalDiscount,
        imageUrl,
        categoryId
      })
    
      return reply.status(201).send({ recipeId: recipe.id })
    })
}