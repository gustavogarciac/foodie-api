import { RecipesRepository } from "@/repositories/recipes-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryRecipesRepository } from "@/repositories/in-memory/in-memory-recipes-repository";
import { DeleteRecipeUseCase } from "../recipes/delete-recipe";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let recipesRepository: RecipesRepository;
let sut: DeleteRecipeUseCase;

describe("Delete a Recipe", () => {
  beforeEach(() => {
    recipesRepository = new InMemoryRecipesRepository()
    sut = new DeleteRecipeUseCase(recipesRepository)
  })

  it("shoult delete a recipe", async () => {
    const recipe = await recipesRepository.create({
      categoryId: 'category-id',
      description: 'description',
      imageUrl: 'image-url',
      name: 'testing-recipe',
      price: 10,
      slug: 'slug',
      totalDiscount: 5
    })

    await sut.execute({ recipeId: recipe.id })

    const recipeFound = await recipesRepository.findById(recipe.id)

    expect(recipeFound).toBeNull()
  })

  it("should throw an error if recipe does not exist", async () => {
    await expect(() => 
      sut.execute({ recipeId: 'invalid-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})