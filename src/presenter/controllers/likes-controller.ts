import express, { Request, Response } from 'express';
import { LikeUseCase } from '../../domain/use-cases/like/like-usecase';
import { GetLikesByPostIdInputDTO, LikeInputDTO } from '../../domain/dto/like-dto';

class LikeController {
  private likeUseCase: LikeUseCase;

  constructor(likeUseCase: LikeUseCase) {
    this.likeUseCase = likeUseCase;
  }

  async getLikes(req: any, res: Response): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const size = Number(req.query.size) || 10;
      const postId = String(req.query.postId);
      const userId = req.userId;
      const inputDto = new GetLikesByPostIdInputDTO(
        userId,
        postId,
        page,
        size,
      );

      const outputDto = await this.likeUseCase.getLikes(inputDto);

      res.status(200).json(outputDto);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  async createLike(req: any, res: Response): Promise<void> {
    try {

      const likeDto = new LikeInputDTO(
        req.userId,
        req.body.postId,
      );
      console.log('likeDto', req.userId,);
      const inputDto = await this.likeUseCase.createLike(likeDto);

      res.status(200).json(inputDto);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send(error.message);
    }
  }
}


export default LikeController;
