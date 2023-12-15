import RecipeStep from "../../domain/entities/recipe_step";
import { StepRepository } from "../../domain/repositories/steps-repository";
import { RecipeStepSchema } from "../orm/recipe-step";

export class StepRepositoryImpl implements StepRepository {
  async getSteps(page: number, pageSize: number): Promise<RecipeStep[]> {
    const steps = await RecipeStepSchema.find()
      .skip(page * pageSize)
      .limit(pageSize);
    return steps.map((step) => new RecipeStep(step.step, step.description));
  }

  async getStep(id: number): Promise<RecipeStep> {
    const step = await RecipeStepSchema.findById(id);
    if (!step) {
      throw new Error("Step not found");
    }
    return new RecipeStep(step.step, step.description);
  }

  async createStep(step: RecipeStep): Promise<RecipeStep> {
    const newStep = new RecipeStepSchema(step);
    await newStep.save();
    return new RecipeStep(newStep.step, newStep.description);
  }

  async updateStep(step: RecipeStep): Promise<RecipeStep> {
    const updatedStep = await RecipeStepSchema.findByIdAndUpdate(
      step.step,
      step,
      { new: true }
    );
    if (!updatedStep) {
      throw new Error("Step not found");
    }
    return new RecipeStep(updatedStep.step, updatedStep.description);
  }

  async deleteStep(id: number): Promise<void> {
    await RecipeStepSchema.findByIdAndDelete(id);
  }
}