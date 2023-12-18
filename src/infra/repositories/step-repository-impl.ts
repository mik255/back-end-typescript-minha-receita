import RecipeStepEntity from "../../domain/entities/recipe_step";
import { StepRepository } from "../../domain/repositories/steps-repository";
import { RecipeStepSchema } from "../orm/recipe-step";

export class StepRepositoryImpl implements StepRepository {
  async getSteps(page: number, pageSize: number): Promise<RecipeStepEntity[]> {
    const steps = await RecipeStepSchema.find()
      .skip(page * pageSize)
      .limit(pageSize);
    return steps.map((step) => new RecipeStepEntity(step.step, step.description));
  }

  async getStep(id: number): Promise<RecipeStepEntity> {
    const step = await RecipeStepSchema.findById(id);
    if (!step) {
      throw new Error("Step not found");
    }
    return new RecipeStepEntity(step.step, step.description);
  }

  async createStep(step: RecipeStepEntity): Promise<RecipeStepEntity> {
    const newStep = new RecipeStepSchema(step);
    await newStep.save();
    return new RecipeStepEntity(newStep.step, newStep.description);
  }

  async updateStep(step: RecipeStepEntity): Promise<RecipeStepEntity> {
    const updatedStep = await RecipeStepSchema.findByIdAndUpdate(
      step.step,
      step,
      { new: true }
    );
    if (!updatedStep) {
      throw new Error("Step not found");
    }
    return new RecipeStepEntity(updatedStep.step, updatedStep.description);
  }

  async deleteStep(id: number): Promise<void> {
    await RecipeStepSchema.findByIdAndDelete(id);
  }
}