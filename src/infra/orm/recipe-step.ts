// recipe_step.ts
import { Schema, model } from 'mongoose';
import RecipeStepEntity from '../../domain/entities/recipe_step';


const recipeStepSchema = new Schema<RecipeStepEntity>({
  step: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const RecipeStepSchema = model<RecipeStepEntity>('RecipeStep', recipeStepSchema);
