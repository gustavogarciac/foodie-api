import fastify from "fastify";
import { errorHandler } from "./error-handler";
import fastifySwagger from "@fastify/swagger";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { recipesRoutes } from "./http/controllers/recipes/routes";
import { categoriesRoutes } from "./http/controllers/categories/routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'token',
    signed: true
  },
  sign: {
    expiresIn: '50m'
  }
})

app.register(fastifyCookie)

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
app.register(categoriesRoutes)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)