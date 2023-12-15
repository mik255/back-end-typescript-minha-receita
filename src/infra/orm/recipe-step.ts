// recipe_step.ts
import { Schema, model } from 'mongoose';
import RecipeStep from '../../domain/entities/recipe_step';


const recipeStepSchema = new Schema<RecipeStep>({
  step: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const RecipeStepSchema = model<RecipeStep>('RecipeStep', recipeStepSchema);
