import { RecipesRepository } from "@/repositories/recipes-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryRecipesRepository } from "@/repositories/in-memory/in-memory-recipes-repository";
import { SearchRecipeUseCase } from "../recipes/search-recipe";

let recipesRepository: RecipesRepository;
let sut: SearchRecipeUseCase;

describe("Search Recipes", () => {
  beforeEach(() => {
    recipesRepository = new InMemoryRecipesRepository()
    sut = new SearchRecipeUseCase(recipesRepository)
  })

  it("should be able to search for recipes", async () => {
    await recipesRepository.create({
      categoryId: "1",
      description: "description",
      imageUrl: "image-url",
      name: "recipe-01",
      price: 10,
      slug: "recipe-01",
      totalDiscount: 0,
    })

    await recipesRepository.create({
      categoryId: "1",
      description: "description",
      imageUrl: "image-url",
      name: "recipe-02",
      price: 10,
      slug: "recipe-02",
      totalDiscount: 0,
    })

    const response = await sut.execute({
      page: 1,
      query: "recipe-01"
    })

    expect(response.recipes.length).toBe(1)
    expect(response.recipes).toEqual([
      expect.objectContaining({
        name: 'recipe-01'
      })
    ])
  })
})