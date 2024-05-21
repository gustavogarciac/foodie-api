import { ZodError } from "zod"
import { env } from "./env"
import { FastifyInstance } from "fastify"
import { CategoryAlreadyExistsError } from "./use-cases/errors/category-already-exists"
import { RecipeAlreadyExistsError } from "./use-cases/errors/recipe-already-exists-error"
import { ResourceNotFoundError } from "./use-cases/errors/resource-not-found-error"
import { InvalidCredentialsError } from "./use-cases/errors/invalid-credentials-error"

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, _req, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format()})
  }

  if (env.NODE_ENV !== "production") {
    console.error(error)
  }

  if (error instanceof CategoryAlreadyExistsError)
    return reply.status(400).send({ issue: error.message })

  if (error instanceof RecipeAlreadyExistsError)
    return reply.status(400).send({ issue: error.message })

  if (error instanceof ResourceNotFoundError)
    return reply.status(404).send({ issue: error.message })

  if (error instanceof InvalidCredentialsError)
    return reply.status(401).send({ issue: error.message })

  return reply.status(500).send({ message: "Internal server error." })
}