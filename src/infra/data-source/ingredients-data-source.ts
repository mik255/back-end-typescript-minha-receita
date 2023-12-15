import IngredientValueObject from "../../domain/entities/ingredient";
import IngredientScheme from "../orm/ingredient";

export interface IngredientsDatasource{
    getIngredients(page: number, pageSize: number): Promise<IngredientValueObject[]>;
    getIngredient(id: number): Promise<IngredientValueObject>;
    createIngredient(ingredient: IngredientValueObject): Promise<IngredientValueObject>;
    updateIngredient(ingredient: IngredientValueObject): Promise<IngredientValueObject>;
    deleteIngredient(id: number): Promise<void>;
}

export class IngredientsDatasourceImpl implements IngredientsDatasource{
    getIngredients(page: number, pageSize: number): Promise<IngredientValueObject[]> {
        throw new Error("Method not implemented.");
    }
    getIngredient(id: number): Promise<IngredientValueObject> {
        throw new Error("Method not implemented.");
    }
    createIngredient(ingredient: IngredientValueObject): Promise<IngredientValueObject> {
        return IngredientScheme.create(ingredient);
    }
    updateIngredient(ingredient: IngredientValueObject): Promise<IngredientValueObject> {
        throw new Error("Method not implemented.");
    }
    deleteIngredient(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}