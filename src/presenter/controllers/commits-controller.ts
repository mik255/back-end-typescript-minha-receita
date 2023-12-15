
import express, { Request, Response } from 'express';

import RecipeEntity from '../../domain/entities/recipe';
import { RecipeUseCaseApplication } from '../../application/use-cases/recipe-usecase';
import { LikesUseCaseApplication } from '../../application/use-cases/likes-usecases';
import { LikeEntity } from '../../domain/entities/like';
import { CommitUseCasesApplicationImpl } from '../../application/use-cases/commits-usecases';
import { CommentEntity } from '../../domain/entities/commit';

class CommitsController {
  private commitsUsecaseApplication: CommitUseCasesApplicationImpl;

  constructor(commitsUsecaseApplication: CommitUseCasesApplicationImpl) {
    this.commitsUsecaseApplication = commitsUsecaseApplication;
  }

  async getCommits(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const size = Number(req.query.size) || 10;
      const postId = String(req.query.postId);
      const comments: CommentEntity[] = await this.commitsUsecaseApplication.getCommits(page, size, postId);

      res.status(200).json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  async createComment(req: Request, res: Response): Promise<void> {
    try {
      const comment: CommentEntity = req.body;
      const like: CommentEntity = await this.commitsUsecaseApplication.createCommit(comment);

      res.status(200).json(like);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}


export default CommitsController;
