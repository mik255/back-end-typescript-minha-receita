import IngredientValueObject from "../entities/ingredient";


export interface IngredientRepository {
    getIngredients(page: number, pageSize: number): Promise<IngredientValueObject[]>;
    getIngredient(id: number): Promise<IngredientValueObject>;
    createIngredient(ingredient: IngredientValueObject): Promise<IngredientValueObject>;
    updateIngredient(ingredient: IngredientValueObject): Promise<IngredientValueObject>;
    deleteIngredient(id: number): Promise<void>;
}
