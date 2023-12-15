import {Schema, model } from 'mongoose';
import IngredientValueObject from '../../domain/entities/ingredient';



const ingredientSchema = new Schema<IngredientValueObject>({
    description: {
        type: String,
        required: true,
    },
});

const IngredientScheme = model<IngredientValueObject>('Ingredient', ingredientSchema);

export default IngredientScheme;
