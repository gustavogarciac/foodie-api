import { RecipesRepository } from "@/repositories/recipes-repository";
import { Recipe } from "@prisma/client";

interface SearchRecipeUseCaseParams {
  query: string | null;
  page: number;
}

interface SearchRecipeUseCaseResponse {
  recipes: Recipe[]
}

export class SearchRecipeUseCase {
  constructor(private recipesRepository: RecipesRepository) {}

  async execute({
    page,
    query
  }: SearchRecipeUseCaseParams): Promise<SearchRecipeUseCaseResponse> {
    const recipes = await this.recipesRepository.searchMany(query, page);

    return {
      recipes
    }
  }
}