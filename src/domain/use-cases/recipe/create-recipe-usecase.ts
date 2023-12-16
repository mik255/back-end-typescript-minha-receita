import RecipeEntity from "../../entities/recipe";
import { RecipeRepository } from "../../repositories/recipe-repository";


export interface recipeUseCase {
    getRecipes(page: number, pageSize: number,userId:String): Promise<RecipeEntity[]>;
    getRecipeById(id: string): Promise<RecipeEntity>;
    createRecipe(recipe: RecipeEntity): Promise<RecipeEntity>;
    updateRecipe(recipe: RecipeEntity): Promise<RecipeEntity>;
    deleteRecipe(id: number): Promise<void>;
}

export class RecipeUseCase implements recipeUseCase {
    private recipeRepository: RecipeRepository;

    constructor(recipeRepository: RecipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    getRecipes(page: number, pageSize: number,userId:String): Promise<RecipeEntity[]>{
        return this.recipeRepository.getRecipes(page, pageSize,userId);
    }

    getRecipeById(id: string): Promise<RecipeEntity> {
        return this.recipeRepository.getRecipeById(id);
    }

    createRecipe(recipe: RecipeEntity): Promise<RecipeEntity> {
        return this.recipeRepository.createRecipe(recipe);
    }

    updateRecipe(recipe: RecipeEntity): Promise<RecipeEntity> {
        throw new Error("Method not implemented.");
    }

    deleteRecipe(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}