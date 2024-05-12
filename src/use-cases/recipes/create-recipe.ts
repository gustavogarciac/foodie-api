import { RecipesRepository } from "@/repositories/recipes-repository";
import { generateSlug } from "@/utils/generate-slug";
import { Category } from "@prisma/client";
import { RecipeAlreadyExistsError } from "../errors/recipe-already-exists-error";

interface CreateRecipeUseCaseParams {
  name: string
  description: string
  price: number
  totalDiscount: number
  imageUrl: string
  categoryId: string
}

export class CreateRecipeUseCase {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute({
    categoryId,
    description,
    imageUrl,
    name,
    price,
    totalDiscount
  }: CreateRecipeUseCaseParams) {
    const slug = generateSlug(name)

    const productWithSameSlugExists = await this.recipesRepository.findBySlug(slug)

    if(productWithSameSlugExists) throw new RecipeAlreadyExistsError()

    const recipe = await this.recipesRepository.create({
      description,
      imageUrl,
      name,
      price,
      slug,
      categoryId,
      totalDiscount,
    })

    return recipe
  }
}