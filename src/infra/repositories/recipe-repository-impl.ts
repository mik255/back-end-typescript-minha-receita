import RecipeEntity from "../../domain/entities/recipe";
import { RecipeRepository } from "../../domain/repositories/recipe-repository";
import { RecipeDatasource } from "../data-source/recipe-data-source";


export class RecipeRepositoryImpl implements RecipeRepository {
    private recipeDatasource: RecipeDatasource;
    constructor(recipeDatasource: RecipeDatasource) {
        this.recipeDatasource = recipeDatasource;
    }
    async getRecipes(page: number, pageSize: number,userId:string): Promise<RecipeEntity[]> {
        return await this.recipeDatasource.getRecipes(page, pageSize,userId);

    }
    getRecipeById(id: string): Promise<RecipeEntity> {
        return this.recipeDatasource.getRecipeById(id);
    }
    async createRecipe(recipe: RecipeEntity): Promise<RecipeEntity> {
        return await this.recipeDatasource.createRecipe(recipe);
    }
    updateRecipe(recipe: RecipeEntity): Promise<RecipeEntity> {
        throw new Error("Method not implemented.");
    }
    deleteRecipe(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}