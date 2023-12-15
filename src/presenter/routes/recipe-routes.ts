import express from 'express';
import { RecipeUseCase } from '../../domain/use-cases/recipe/create-recipe-usecase';
import { RecipeRepositoryImpl } from '../../infra/repositories/recipe-repository-impl';
import { RecipeDatasourceImpl } from '../../infra/data-source/recipe-data-source';
import RecipeController from '../controllers/recipe-controller';
import { RecipeUseCaseApplication } from '../../application/use-cases/recipe-usecase';


const recipeRouter = express.Router();
const recipeUsecaseApplication = new RecipeUseCaseApplication(
    new RecipeUseCase(new RecipeRepositoryImpl(new RecipeDatasourceImpl())),
  );
const recipeController = new RecipeController(recipeUsecaseApplication);

recipeRouter.get('/', async (req, res) => {
  await recipeController.getRecipes(req, res);
});
recipeRouter.post('/', async (req, res) => {
    await recipeController.createRecipe(req, res);
  });
export default recipeRouter;