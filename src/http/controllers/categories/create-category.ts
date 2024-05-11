import { makeCreateCategoryUseCase } from "@/use-cases/factories/make-create-category-use-case";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function createCategoryRoute(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post("/categories", {
      schema: {
        summary: "Create a new category",
        tags: ['categories'],
        body: z.object({
          name: z.string().min(3).max(150),
        }),
        response: {
          201: z.object({
            categoryId: z.string().uuid()
          })
        }
      }
    }, async (req, reply) => {
      const { 
        name,
      } = req.body
    
      const createCategoryUseCase = makeCreateCategoryUseCase()
    
      const category = await createCategoryUseCase.execute({
        name,
      })
    
      return reply.status(201).send({ categoryId: category.id })
    })
}