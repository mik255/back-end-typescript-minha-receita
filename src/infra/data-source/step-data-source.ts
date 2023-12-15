import RecipeStep from "../../domain/entities/recipe_step";
import { RecipeStepSchema } from "../orm/recipe-step";

export interface stepDataSource {
    getSteps(page: number, pageSize: number): Promise<RecipeStep[]>;
    getStep(id: number): Promise<RecipeStep>;
    createStep(step: RecipeStep): Promise<RecipeStep>;
    updateStep(step: RecipeStep): Promise<RecipeStep>;
    deleteStep(id: number): Promise<void>;

}

export class StepDataSourceImpl implements stepDataSource{
    getSteps(page: number, pageSize: number): Promise<RecipeStep[]> {
        throw new Error("Method not implemented.");
    }
    getStep(id: number): Promise<RecipeStep> {
        throw new Error("Method not implemented.");
    }
    createStep(step: RecipeStep): Promise<RecipeStep> {
        return RecipeStepSchema.create(step);
    }
    updateStep(step: RecipeStep): Promise<RecipeStep> {
        throw new Error("Method not implemented.");
    }
    deleteStep(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}