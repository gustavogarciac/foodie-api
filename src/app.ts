import fastify from "fastify";
import { errorHandler } from "./error-handler";
import fastifySwagger from "@fastify/swagger";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { recipesRoutes } from "./http/controllers/recipes/routes";
import { register } from "module";

export const app = fastify()

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: "Foodie API",
      description: "API for Foodie App",
      version: '1.0.0'
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
})

app.register(recipesRoutes)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)