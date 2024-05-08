export class RecipeAlreadyExistsError extends Error {
  constructor() {
    super("Recipe already exists.")
  }
}