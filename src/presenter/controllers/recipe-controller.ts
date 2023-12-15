import express, { Request, Response } from 'express';

import RecipeEntity from '../../domain/entities/recipe';
import { RecipeUseCaseApplication } from '../../application/use-cases/recipe-usecase';

class RecipeController {
  private recipeUsecaseApplication: RecipeUseCaseApplication;

  constructor(recipeUsecaseApplication: RecipeUseCaseApplication) {
    this.recipeUsecaseApplication = recipeUsecaseApplication;
  }

  async getRecipes(req, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const size = Number(req.query.size) || 10;
      const userId = req.userId;

      const posts: RecipeEntity[] = await this.recipeUsecaseApplication.getPosts(page, size, userId);

      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  async createRecipe(req: Request, res: Response): Promise<void> {
    try {
      const recipe: RecipeEntity = req.body;
      const post: RecipeEntity = await this.recipeUsecaseApplication.createPost(recipe);

      res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}


export default RecipeController;
