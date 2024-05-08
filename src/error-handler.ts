import { ZodError } from "zod"
import { env } from "./env"
import { FastifyInstance } from "fastify"

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

  return reply.status(500).send({ message: "Internal server error." })
}