import RecipeStepEntity from "../../domain/entities/recipe_step";
import { RecipeStepSchema } from "../orm/recipe-step";

export interface stepDataSource {
    getSteps(page: number, pageSize: number): Promise<RecipeStepEntity[]>;
    getStep(id: number): Promise<RecipeStepEntity>;
    createStep(step: RecipeStepEntity): Promise<RecipeStepEntity>;
    updateStep(step: RecipeStepEntity): Promise<RecipeStepEntity>;
    deleteStep(id: number): Promise<void>;

}

export class StepDataSourceImpl implements stepDataSource{
    getSteps(page: number, pageSize: number): Promise<RecipeStepEntity[]> {
        throw new Error("Method not implemented.");
    }
    getStep(id: number): Promise<RecipeStepEntity> {
        throw new Error("Method not implemented.");
    }
    createStep(step: RecipeStepEntity): Promise<RecipeStepEntity> {
        return RecipeStepSchema.create(step);
    }
    updateStep(step: RecipeStepEntity): Promise<RecipeStepEntity> {
        throw new Error("Method not implemented.");
    }
    deleteStep(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}