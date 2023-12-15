// recipe.ts
import { Schema, Document, model, Types } from 'mongoose';
import RecipeEntity from '../../domain/entities/recipe';
import IngredientScheme from './ingredient';
import { RecipeStepSchema } from './recipe-step';



const recipeSchema = new Schema<RecipeEntity>({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  timeInMinutes: {
    type: Number,
    required: true,
  },
  recipeImgUrlList: {
    type: [String],
    required: true,
  },
  ingredients: [
    {
      type: [
         IngredientScheme.schema.obj,
      ]
    },
  ],
  steps: [
    {
        type: [
           RecipeStepSchema.schema.obj,
        ]
      },
  ],
});

export const RecipeSchema = model<RecipeEntity>('Recipe', recipeSchema);
