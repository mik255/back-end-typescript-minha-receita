import IngredientEntity from "../../domain/entities/ingredient";
import IngredientScheme from "../orm/ingredient";

export interface IngredientsDatasource{
    getIngredients(page: number, pageSize: number): Promise<IngredientEntity[]>;
    getIngredient(id: number): Promise<IngredientEntity>;
    createIngredient(ingredient: IngredientEntity): Promise<IngredientEntity>;
    updateIngredient(ingredient: IngredientEntity): Promise<IngredientEntity>;
    deleteIngredient(id: number): Promise<void>;
}

export class IngredientsDatasourceImpl implements IngredientsDatasource{
    getIngredients(page: number, pageSize: number): Promise<IngredientEntity[]> {
        throw new Error("Method not implemented.");
    }
    getIngredient(id: number): Promise<IngredientEntity> {
        throw new Error("Method not implemented.");
    }
    createIngredient(ingredient: IngredientEntity): Promise<IngredientEntity> {
        return IngredientScheme.create(ingredient);
    }
    updateIngredient(ingredient: IngredientEntity): Promise<IngredientEntity> {
        throw new Error("Method not implemented.");
    }
    deleteIngredient(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}