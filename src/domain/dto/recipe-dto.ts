import e from "express";
import RecipeEntity from "../entities/recipe";
import RecipeStepEntity from "../entities/recipe_step";
import IngredientEntity from "../entities/ingredient";
import { FileInputDTO } from "./file-dto";

export class RecipeInputDto {
    constructor(
        public value: RecipeEntity,
    ) { }
    }

export class RecipeOutputDto {}

export class GetRecipeInputDto {
    constructor(
        public recipeId: string,
    ) { }
}

export class DefaultRecipeOutputDto {
    constructor(
        public value: RecipeEntity,
    ) { }
}

export class GetRecipesInputDto {
    constructor(
        public userId: string,
        public page: number,
        public pageSize: number,
    ) { }
}

export class GetRecipesOutputDto {
    constructor(
        public value: RecipeEntity[],
    ) { }
}

export class CreateRecipeInputDto {
    constructor(
        public readonly userId: string,
        public readonly title: string,
        public readonly description: string,
        public readonly difficulty: string,
        public readonly status: string,
        public readonly timeInMinutes: number,
        public readonly ingredients: IngredientEntity[],
        public readonly steps: RecipeStepEntity[],
        public readonly imgFiles: string[],
    ) { }
}
