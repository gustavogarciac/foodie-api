import { categories } from "@/constants/categories";
import { PrismaClient } from "@prisma/client";

const createCategories = async () => {
  await prismaClient.category.createMany({
    data: categories
  })
}

const prismaClient = new PrismaClient()

async function seed() {
  await createCategories()
}

seed()
  .then(() => console.log("Seed do banco de dados realizado com sucesso!"))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prismaClient.$disconnect()
  })