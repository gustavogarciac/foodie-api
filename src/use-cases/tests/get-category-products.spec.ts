import { RecipesRepository } from "@/repositories/recipes-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetCategoryProductsUseCase } from "../categories/get-category-products";
import { InMemoryRecipesRepository } from "@/repositories/in-memory/in-memory-recipes-repository";

let recipesRepository: RecipesRepository;
let sut: GetCategoryProductsUseCase;

describe("Get Category Products", () => {
  beforeEach(() => {
    recipesRepository = new InMemoryRecipesRepository()
    sut = new GetCategoryProductsUseCase(recipesRepository)
  })

  it("shoult get category products", async () => {
    await recipesRepository.create({
      categoryId: 'category-id',
      description: 'description',
      imageUrl: 'image-url',
      name: 'testing-recipe',
      price: 10,
      slug: 'slug',
      totalDiscount: 5
    })

    const products = await sut.execute({ categoryId: 'category-id' })

    expect(products).toHaveLength(1)
    expect(products[0].name).toBe('testing-recipe')
  })
})