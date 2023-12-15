import RecipeEntity from "../../domain/entities/recipe";
import { RecipeUseCase } from "../../domain/use-cases/recipe/create-recipe-usecase";

export interface RecipeUseCaseApplication {
    getPosts(page: Number, size: Number,userId:string): Promise<RecipeEntity[]>
    createPost(recipe: RecipeEntity): Promise<RecipeEntity>
}

export class RecipeUseCaseApplication implements RecipeUseCaseApplication {
    private recipeUseCase: RecipeUseCase;
    constructor(recipeUseCase: RecipeUseCase) {
        this.recipeUseCase = recipeUseCase;
    }

    async getPosts(page: number, size: number,userId:string): Promise<RecipeEntity[]> {
        return await this.recipeUseCase.getRecipes(page, size,userId);
    }

    async createPost(recipe: RecipeEntity): Promise<RecipeEntity> {
        return await this.recipeUseCase.createRecipe(recipe);
    }
}