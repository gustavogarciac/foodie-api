import { RecipesRepository } from "@/repositories/recipes-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { UpdateRecipeUseCase } from "../recipes/update-recipe";
import { InMemoryRecipesRepository } from "@/repositories/in-memory/in-memory-recipes-repository";
import { generateSlug } from "@/utils/generate-slug";
import { Decimal } from "@prisma/client/runtime/library";

let recipesRepository: RecipesRepository
let sut: UpdateRecipeUseCase

describe("Update Recipe Use Case", () => {
  beforeEach(() => {
    recipesRepository = new InMemoryRecipesRepository()
    sut = new UpdateRecipeUseCase(recipesRepository)
  })

  it("should update a recipe", async () => {
    const recipe = await recipesRepository.create({
      name: "recipe",
      description: "description",
      price: 10,
      totalDiscount: 5,
      imageUrl: "https://example.com/image.jpg",
      categoryId: "category",
      slug: generateSlug("recipe")
    })

     await sut.execute({
      recipeId: recipe.id,
      data: {
        categoryId: "category",
        description: "updated-description",
        id: recipe.id,
        imageUrl: "https://example.com/image.jpg",
        name: "updated-recipe",
        price: new Decimal(20),
        slug: generateSlug("updated-recipe"),
        totalDiscount: 10,
        updatedAt: new Date()
      }
     })

    const updatedRecipe = await recipesRepository.findById(recipe.id)
    console.log(updatedRecipe)
    expect(updatedRecipe).not.toBe(null)
  })
})