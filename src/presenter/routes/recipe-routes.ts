import express from 'express';
import { RecipeUseCase } from '../../domain/use-cases/recipe/recipe-use-cases';
import { RecipeRepositoryImpl } from '../../infra/repositories/recipe-repository-impl';
import { RecipeDatasourceImpl } from '../../infra/data-source/recipe-data-source';
import RecipeController from '../controllers/recipe-controller';
import multer from 'multer';
import { ImgBase64ServiceImpl } from '../../infra/services/image-base64-service';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const recipeRouter = express.Router();
const controller = new RecipeController(
    new RecipeUseCase(new RecipeRepositoryImpl(new RecipeDatasourceImpl()),
    new ImgBase64ServiceImpl()
    ),
  );


recipeRouter.get('/', async (req, res) => {
  await controller.getRecipes(req, res);
});
recipeRouter.post('/', async (req, res) => {
    await controller.createRecipe(req, res);
  });
export default recipeRouter;