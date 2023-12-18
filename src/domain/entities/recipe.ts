import Ingredient from "./ingredient";
import RecipeStepEntity from "./recipe_step";
import { UserEntity } from "./user";

class RecipeEntity {
    constructor(
      public  id: string,
      public readonly userId: string,
      public readonly title: string,
      public readonly description: string,
      public readonly difficulty: string,
      public readonly status: string,
      public readonly timeInMinutes: number,
      public readonly recipeImgUrlList: string[],
      public readonly ingredients: Ingredient[],
      public readonly steps: RecipeStepEntity[]
    ) {}
  }

  export default RecipeEntity;