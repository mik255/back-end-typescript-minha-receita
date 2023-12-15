import RecipeEntity from "../entities/recipe";


export interface RecipeRepository {
    getRecipes(page: number, pageSize: number,userId:String): Promise<RecipeEntity[]>;
    getRecipe(id: number): Promise<RecipeEntity>;
    createRecipe(recipe: RecipeEntity): Promise<RecipeEntity>;
    updateRecipe(recipe: RecipeEntity): Promise<RecipeEntity>;
    deleteRecipe(id: number): Promise<void>;
}
