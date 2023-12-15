import express from 'express';
import { RecipeUseCase } from '../../domain/use-cases/recipe/create-recipe-usecase';
import { RecipeRepositoryImpl } from '../../infra/repositories/recipe-repository-impl';
import { RecipeDatasourceImpl } from '../../infra/data-source/recipe-data-source';
import RecipeController from '../controllers/recipe-controller';
import { RecipeUseCaseApplication } from '../../application/use-cases/recipe-usecase';
import { PostsUseCaseApplicationImpl } from '../../application/use-cases/post-usecase';
import { PostUseCaseImpl } from '../../domain/use-cases/posts/create-post-use-case';
import { PostsRepositoryImpl } from '../../infra/repositories/post-repository-impl';
import { PostsDataSourceImpl } from '../../infra/data-source/post-data-source';
import { PostController } from '../controllers/post-controller';
import { LikeUseCaseImpl } from '../../domain/use-cases/like/like-usecase';
import { LikeRepositoryImpl } from '../../infra/repositories/like-repository-impl';
import { LikeDataSourceImpl } from '../../infra/data-source/like-data-source';
import { LikesUseCaseApplicationImpl } from '../../application/use-cases/likes-usecases';
import LikeController from '../controllers/likes-controller';
import CommitsController from '../controllers/commits-controller';
import { CommitUseCasesApplicationImpl } from '../../application/use-cases/commits-usecases';
import { CommitUseCaseImpl } from '../../domain/use-cases/commit/commit-usecase';
import { CommitRepositoryImp } from '../../infra/repositories/comments-repository';
import { CommentsDataSourceImpl } from '../../infra/data-source/comments-data-source';


const commentRouter = express.Router();
const commitsUsecaseApplication = new CommitUseCasesApplicationImpl(
    new CommitUseCaseImpl(new CommitRepositoryImp(new CommentsDataSourceImpl()))
  );
const commentsController = new CommitsController(commitsUsecaseApplication);

commentRouter.get('/', async (req, res) => {
  await commentsController.getCommits(req, res);
});
commentRouter.post('/', async (req, res) => {
    await commentsController.createComment(req, res);
  });
export default commentRouter;