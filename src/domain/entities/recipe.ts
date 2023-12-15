import Ingredient from "./ingredient";
import RecipeStep from "./recipe_step";

class Recipe {
    constructor(
      public readonly id: string | null,
      public readonly userId: string,
      public readonly title: string,
      public readonly description: string,
      public readonly difficulty: string,
      public readonly status: string,
      public readonly timeInMinutes: number,
      public readonly recipeImgUrlList: string[],
      public readonly ingredients: Ingredient[],
      public readonly steps: RecipeStep[]
    ) {}
  }

  export default Recipe;