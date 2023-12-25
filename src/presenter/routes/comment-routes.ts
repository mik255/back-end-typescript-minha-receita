import express from 'express';
import CommitsController from '../controllers/commits-controller';
import { CommitUseCaseImpl } from '../../domain/use-cases/commit/commit-usecase';
import { CommitRepositoryImp } from '../../infra/repositories/comments-repository';
import { CommentsDataSourceImpl } from '../../infra/data-source/comments-data-source';
import { AccountUseCaseImpl } from '../../domain/use-cases/account/account-usecase';
import { AccountDataSourceImpl } from '../../infra/data-source/account-data-source';
import { AccountRepositoryImpl } from '../../infra/repositories/account-repository';
import { ImgBase64ServiceImpl } from '../../infra/services/image-base64-service';
import { jwtMiddlewareService } from '../middlewares/jwt';


const commentRouter = express.Router();
const accountUsecase = new AccountUseCaseImpl(
  new AccountRepositoryImpl(
    new AccountDataSourceImpl()
  ),
  new ImgBase64ServiceImpl(),
  jwtMiddlewareService,
);

const controller = new CommitsController(
    new CommitUseCaseImpl(new CommitRepositoryImp(new CommentsDataSourceImpl()),accountUsecase)
  );

commentRouter.get('/', async (req, res) => {
  await controller.getCommits(req, res);
});
commentRouter.post('/', async (req, res) => {
    await controller.createComment(req, res);
  });
export default commentRouter;