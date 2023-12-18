import IngredientEntity from "../entities/ingredient";


export interface IngredientRepository {
    getIngredients(page: number, pageSize: number): Promise<IngredientEntity[]>;
    getIngredient(id: number): Promise<IngredientEntity>;
    createIngredient(ingredient: IngredientEntity): Promise<IngredientEntity>;
    updateIngredient(ingredient: IngredientEntity): Promise<IngredientEntity>;
    deleteIngredient(id: number): Promise<void>;
}
