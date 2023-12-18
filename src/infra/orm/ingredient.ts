import {Schema, model } from 'mongoose';
import IngredientEntity from '../../domain/entities/ingredient';



const ingredientSchema = new Schema<IngredientEntity>({
    description: {
        type: String,
        required: true,
    },
});

const IngredientScheme = model<IngredientEntity>('Ingredient', ingredientSchema);

export default IngredientScheme;
