import express, { Request, Response } from 'express';

import RecipeEntity from '../../domain/entities/recipe';
import { RecipeUseCase } from '../../domain/use-cases/recipe/recipe-use-cases';
import { CreateRecipeInputDto, GetRecipesInputDto } from '../../domain/dto/recipe-dto';
const { v4: uuidv4 } = require('uuid');

class RecipeController {
  private recipeUseCase: RecipeUseCase;

  constructor(recipeUseCase: RecipeUseCase) {
    this.recipeUseCase = recipeUseCase;
  }

  async getRecipes(req, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const size = Number(req.query.size) || 10;
      const userId = req.userId;
      const inputDto = new GetRecipesInputDto(userId, page, size);
      const outputDto = await this.recipeUseCase.getRecipesByUserId(inputDto);
      res.status(200).json(outputDto);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  async createRecipe(req: Request, res: Response): Promise<void> {
    var imgFiles = req.body.recipeImgUrlList as string[];
    try {
      const recipe: RecipeEntity = req.body;
      const inputDto = new CreateRecipeInputDto(
        recipe.userId,
        recipe.title,
        recipe.description,
        recipe.difficulty,
        recipe.status,
        recipe.timeInMinutes,
        recipe.ingredients,
        recipe.steps,
        imgFiles,
      );
      const outputDto = await this.recipeUseCase.createRecipe(inputDto);

      res.status(200).json(outputDto);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}


export default RecipeController;
