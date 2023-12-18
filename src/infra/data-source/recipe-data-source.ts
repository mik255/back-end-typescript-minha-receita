import mongoose from "mongoose";
import RecipeEntity from "../../domain/entities/recipe";
import { RecipeSchema } from "../orm/recipe";
import { RecipeStepSchema } from "../orm/recipe-step";
import IngredientScheme from "../orm/ingredient";

export interface RecipeDatasource {
    getRecipes(page: number, pageSize: number, userId: string): Promise<RecipeEntity[]>;
    getRecipeById(id: string): Promise<RecipeEntity>;
    createRecipe(recipe: RecipeEntity): Promise<RecipeEntity>;
    updateRecipe(recipe: RecipeEntity): Promise<RecipeEntity>;
    deleteRecipe(id: number): Promise<void>;
}


export class RecipeDatasourceImpl implements RecipeDatasource {
    async getRecipes(page: number, pageSize: number, userId: string): Promise<RecipeEntity[]> {
        const skip = (page - 1) * pageSize; // Calcula o número de documentos a serem pulados
        const recipes = await RecipeSchema.find().skip(skip).limit(pageSize).where('userId').equals(userId);
        const recipeObjects = recipes.map((recipe) => recipe.toObject());

        return recipeObjects;

    }
    async getRecipeById(id: string): Promise<RecipeEntity> {
        var recipe = await RecipeSchema.findById(id);
        var recipeObject = recipe.toObject();
        recipeObject.id = recipeObject._id.toString();
        return recipeObject;
    }
    async createRecipe(recipe: RecipeEntity): Promise<RecipeEntity> {
        const session = await mongoose.startSession();
        session.startTransaction();
    
        try {
          const ingredients = await Promise.all(
            recipe.ingredients.map(async (ingredient) => {
              const ingredientObject = await IngredientScheme.create(ingredient);
              return ingredientObject.toObject();
            })
          );
    
          const steps = await Promise.all(
            recipe.steps.map(async (step) => {
              const recipeStep = await RecipeStepSchema.create(step);
              return recipeStep.toObject();
            })
          );
    
          const recipeObject = {
            ...recipe,
            ingredients,
            steps,
          };
    
          const newRecipe = await RecipeSchema.create(recipeObject);
    
          await session.commitTransaction();
          return newRecipe.toObject();
        } catch (err) {
          await session.abortTransaction();
          console.error(err);
          throw new Error('Erro ao criar receita');
        } finally {
          session.endSession();
        }
      }
    updateRecipe(recipe: RecipeEntity): Promise<RecipeEntity> {
        throw new Error("Method not implemented.");
    }
    deleteRecipe(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}