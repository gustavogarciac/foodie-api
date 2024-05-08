import { CreateRecipeUseCase } from "@/use-cases/create-recipe";
import { makeCreateRecipeUseCase } from "@/use-cases/factories/make-create-recipe-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createRecipe(req: FastifyRequest, reply: FastifyReply) {
  const createRecipeBodySchema = z.object({
    name: z.string().min(3).max(150),
    description: z.string().min(3).max(500),
    price: z.number().min(1),
    totalDiscount: z.number().default(0),
    imageUrl: z.string().url(),
    categoryId: z.string().uuid()
  })

  const { 
    name, 
    description, 
    price, 
    totalDiscount, 
    imageUrl, 
    categoryId 
  } = createRecipeBodySchema.parse(req.body)

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
} 