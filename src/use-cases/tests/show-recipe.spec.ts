import { RecipesRepository } from "@/repositories/recipes-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetCategoryProductsUseCase } from "../categories/get-category-products";
import { InMemoryRecipesRepository } from "@/repositories/in-memory/in-memory-recipes-repository";
import { CategoriesRepository } from "@/repositories/categories-repository";
import { ShowRecipeUseCase } from "../recipes/show-recipe";
import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { generateSlug } from "@/utils/generate-slug";

let recipesRepository: RecipesRepository;
let categoriesRepository: CategoriesRepository
let sut: ShowRecipeUseCase;

describe("Show a specific recipe", () => {
  beforeEach(() => {
    recipesRepository = new InMemoryRecipesRepository()
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new ShowRecipeUseCase(recipesRepository, categoriesRepository)
  })

  it("should get a specific recipe info", async () => {
    const category = await categoriesRepository.create({
      name: "testing-category",
      slug: generateSlug("testing-category")
    })

    const recipe = await recipesRepository.create({
      name: "testing-recipe",
      categoryId: category.id,
      description: "testing-description",
      imageUrl: "testing-image-url",
      price: 10,
      slug: generateSlug("testing-recipe"),
      totalDiscount: 0,
    })

    const result = await sut.execute({ recipeId: recipe.id })

    expect(result.id).toEqual(expect.any(String))
  })
})