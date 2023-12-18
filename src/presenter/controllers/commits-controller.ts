
import express, { Request, Response } from 'express';
import { CommentEntity } from '../../domain/entities/commit';
import { CommitUseCase } from '../../domain/use-cases/commit/commit-usecase';
import { GetCommentByPostInputDTO } from '../../domain/dto/comment';

class CommitsController {
  private commitsUsecase: CommitUseCase;

  constructor(commitsUsecase: CommitUseCase) {
    this.commitsUsecase = commitsUsecase;
  }

  async getCommits(req: Request, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const size = Number(req.query.size) || 10;
      const postId = String(req.query.postId);
      const imputDto = new GetCommentByPostInputDTO(
        req.body.userId,
        postId,
        page,
        size,
      )
      const outputDto = await this.commitsUsecase.getCommits(imputDto);

      res.status(200).json(outputDto);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  async createComment(req: Request, res: Response): Promise<void> {
    try {
      const comment: CommentEntity = req.body;
      const like: CommentEntity = await this.commitsUsecase.createCommit(comment);

      res.status(200).json(like);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}


export default CommitsController;
