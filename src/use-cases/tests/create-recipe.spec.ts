import { InMemoryRecipesRepository } from "@/repositories/in-memory/in-memory-recipes-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { CreateRecipeUseCase } from "../recipes/create-recipe";
import { RecipeAlreadyExistsError } from "../errors/recipe-already-exists-error";

let recipesRepository: InMemoryRecipesRepository;
let sut: CreateRecipeUseCase;

describe("Create Recipe", () => {
  beforeEach(() => {
    recipesRepository = new InMemoryRecipesRepository();
    sut = new CreateRecipeUseCase(recipesRepository);
  })

  it("should create a recipe", async () => {
    const recipe = await sut.execute({
      categoryId: "category-id",
      description: "description",
      imageUrl: "image-url",
      name: "name",
      price: 10,
      totalDiscount: 5
    })  

    expect(recipe.id).toEqual(expect.any(String))
  })

  it("should not create a recipe with the same slug", async () => {
    await sut.execute({
      categoryId: "category-id",
      description: "description",
      imageUrl: "image-url",
      name: "repeating-slugs",
      price: 10,
      totalDiscount: 5
    })

    await expect(() =>
      sut.execute({
        categoryId: "category-id",
        description: "description",
        imageUrl: "image-url",
        name: "repeating-slugs",
        price: 10,
        totalDiscount: 5
      })
    ).rejects.toBeInstanceOf(RecipeAlreadyExistsError)

  })
})