import express from 'express';
import { LikeUseCaseImpl } from '../../domain/use-cases/like/like-usecase';
import { LikeRepositoryImpl } from '../../infra/repositories/like-repository-impl';
import { LikeDataSourceImpl } from '../../infra/data-source/like-data-source';
import LikeController from '../controllers/likes-controller';
import { AccountUseCaseImpl } from '../../domain/use-cases/account/account-usecase';
import { AccountRepositoryImpl } from '../../infra/repositories/account-repository';
import { AccountDataSourceImpl } from '../../infra/data-source/account-data-source';
import { ImgBase64ServiceImpl } from '../../infra/services/image-base64-service';
import { jwtMiddlewareService } from '../middlewares/jwt';

const likesRouter = express.Router();
const accountUsecase = new AccountUseCaseImpl(
  new AccountRepositoryImpl(
    new AccountDataSourceImpl()
  ),
  new ImgBase64ServiceImpl(),
  jwtMiddlewareService,
);
const likeUseCase = new LikeUseCaseImpl(new LikeRepositoryImpl(new LikeDataSourceImpl()),accountUsecase);

const likeController = new LikeController(likeUseCase);

likesRouter.get('/', async (req, res) => {
  await likeController.getLikes(req, res);
});
likesRouter.post('/', async (req, res) => {
  await likeController.createLike(req, res);
});
export default likesRouter;