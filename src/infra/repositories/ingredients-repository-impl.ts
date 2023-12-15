import IngredientValueObject from "../../domain/entities/ingredient";
import { IngredientRepository } from "../../domain/repositories/ingredient-repository";
import IngredientScheme from "../orm/ingredient";


export class IngredientRepositoryImpl implements IngredientRepository {
    async getIngredients(page: number, pageSize: number): Promise<IngredientValueObject[]> {
        const ingredients = await IngredientScheme.find()
            .skip(page * pageSize)
            .limit(pageSize)
            .exec();
        return ingredients;
    }

    async getIngredient(id: number): Promise<IngredientValueObject> {
        const ingredient = await IngredientScheme.findById(id).exec();
        return ingredient;
    }

    async createIngredient(ingredient: IngredientValueObject): Promise<IngredientValueObject> {
        const newIngredient = await IngredientScheme.create(ingredient);
        return newIngredient;
    }

    async updateIngredient(ingredient: IngredientValueObject): Promise<IngredientValueObject> {
        const updatedIngredient = await IngredientScheme.findByIdAndUpdate('implementar id', ingredient).exec();
        return updatedIngredient;
    }

    async deleteIngredient(id: number): Promise<void> {
        await IngredientScheme.findByIdAndDelete(id).exec();
    }
}