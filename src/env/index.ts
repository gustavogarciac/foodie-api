import { z } from "zod"
import "dotenv/config"

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error("Invalid Environment Variables", _env.error.format())

  throw new Error("Invalid Environment Variables")
}

export const env = _env.data