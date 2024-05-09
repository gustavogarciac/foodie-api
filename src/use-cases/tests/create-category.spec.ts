import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { CreateCategoryUseCase } from "../create-category";
import { CategoryAlreadyExistsError } from "../errors/category-already-exists";

let categoriesRepository: InMemoryCategoriesRepository
let sut: CreateCategoryUseCase

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new CreateCategoryUseCase(categoriesRepository)
  })

  it("should create a category", async () => {
    const category = await sut.execute({ name: 'category-name'})

    expect(category.id).toEqual(expect.any(String))
  })

  it("should not create a category with the same name", async () => {
    await sut.execute({ name: 'repeated-category-name'})

    await expect(() => 
      sut.execute({ name: 'repeated-category-name'})
    ).rejects.toBeInstanceOf(CategoryAlreadyExistsError)
  })
})