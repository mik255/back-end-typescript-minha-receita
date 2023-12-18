import express from 'express';
import CommitsController from '../controllers/commits-controller';
import { CommitUseCaseImpl } from '../../domain/use-cases/commit/commit-usecase';
import { CommitRepositoryImp } from '../../infra/repositories/comments-repository';
import { CommentsDataSourceImpl } from '../../infra/data-source/comments-data-source';


const commentRouter = express.Router();
const controller = new CommitsController(
    new CommitUseCaseImpl(new CommitRepositoryImp(new CommentsDataSourceImpl()))
  );

commentRouter.get('/', async (req, res) => {
  await controller.getCommits(req, res);
});
commentRouter.post('/', async (req, res) => {
    await controller.createComment(req, res);
  });
export default commentRouter;