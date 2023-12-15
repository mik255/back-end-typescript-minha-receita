import RecipeEntity from "../../domain/entities/recipe";
import IngredientScheme from "../orm/ingredient";
import { RecipeSchema } from "../orm/recipe";
import { RecipeStepSchema } from "../orm/recipe-step";

export interface RecipeDatasource {
    getRecipes(page: number, pageSize: number,userId:string): Promise<RecipeEntity[]>;
    getRecipe(id: number): Promise<RecipeEntity>;
    createRecipe(recipe: RecipeEntity): Promise<RecipeEntity>;
    updateRecipe(recipe: RecipeEntity): Promise<RecipeEntity>;
    deleteRecipe(id: number): Promise<void>;
}


export class RecipeDatasourceImpl implements RecipeDatasource {
    async getRecipes(page: number, pageSize: number,userId:string): Promise<RecipeEntity[]> {
        const skip = (page - 1) * pageSize; // Calcula o número de documentos a serem pulados
        const recipes = await RecipeSchema.find().skip(skip).limit(pageSize).where('userId').equals(userId);
        const recipeObjects = recipes.map((recipe) => recipe.toObject());

        return recipeObjects;

    }
    getRecipe(id: number): Promise<RecipeEntity> {
        throw new Error("Method not implemented.");
    }
    async createRecipe(recipe: RecipeEntity): Promise<RecipeEntity> {
        const ingredients = await Promise.all(
            recipe.ingredients.map(async (ingredient) => {
                const ingredientObject = await IngredientScheme.create(ingredient);
                return ingredientObject;
            })
        );
        const steps = await Promise.all(
            recipe.steps.map(async (step) => {
                const recipeStep = await RecipeStepSchema.create(step);
                return recipeStep;
            })
        );
        const recipeObject = {
            ...recipe,
            ingredients: ingredients,
            steps: steps
        };
        const newRecipe = await RecipeSchema.create(recipeObject);
        return newRecipe;
    }
    updateRecipe(recipe: RecipeEntity): Promise<RecipeEntity> {
        throw new Error("Method not implemented.");
    }
    deleteRecipe(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}