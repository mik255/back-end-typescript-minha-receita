import RecipeStep from "../entities/recipe_step";


export interface StepRepository {
    getSteps(page: number, pageSize: number): Promise<RecipeStep[]>;
    getStep(id: number): Promise<RecipeStep>;
    createStep(step: RecipeStep): Promise<RecipeStep>;
    updateStep(step: RecipeStep): Promise<RecipeStep>;
    deleteStep(id: number): Promise<void>;

}
