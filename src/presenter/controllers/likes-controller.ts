import express, { Request, Response } from 'express';

import RecipeEntity from '../../domain/entities/recipe';
import { RecipeUseCaseApplication } from '../../application/use-cases/recipe-usecase';
import { LikesUseCaseApplication } from '../../application/use-cases/likes-usecases';
import { LikeEntity } from '../../domain/entities/like';

class LikeController {
  private likesUsecaseApplication: LikesUseCaseApplication;

  constructor(likesUsecaseApplication: LikesUseCaseApplication) {
    this.likesUsecaseApplication = likesUsecaseApplication;
  }

  async getLikes(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const size = Number(req.query.size) || 10;
      const postId = String(req.query.postId);
      const likes: LikeEntity[] = await this.likesUsecaseApplication.getLikes(page, size, postId);

      res.status(200).json(likes);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  async createLike(req: Request, res: Response): Promise<void> {
    try {
      const recipe: LikeEntity = req.body;
      const like: LikeEntity = await this.likesUsecaseApplication.createLike(recipe);

      res.status(200).json(like);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}


export default LikeController;
