import RecipeStepEntity from "../entities/recipe_step";


export interface StepRepository {
    getSteps(page: number, pageSize: number): Promise<RecipeStepEntity[]>;
    getStep(id: number): Promise<RecipeStepEntity>;
    createStep(step: RecipeStepEntity): Promise<RecipeStepEntity>;
    updateStep(step: RecipeStepEntity): Promise<RecipeStepEntity>;
    deleteStep(id: number): Promise<void>;

}
