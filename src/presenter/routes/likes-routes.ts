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
import { AccountUseCaseImpl } from '../../domain/use-cases/account/account-usecase';
import { AccountRepositoryImpl } from '../../infra/repositories/account-repository';
import { AccountDataSourceImpl } from '../../infra/data-source/account-data-source';
import { AccountUseCaseApplicationImpl } from '../../application/use-cases/account-usecases';


const likesRouter = express.Router();
const likeUseCase = new LikeUseCaseImpl(new LikeRepositoryImpl(new LikeDataSourceImpl()));
const accountUseCase = new AccountUseCaseApplicationImpl(new AccountUseCaseImpl(new AccountRepositoryImpl(new AccountDataSourceImpl())));
const likesUseCaseApplicationImpl = new LikesUseCaseApplicationImpl(
  likeUseCase,
  accountUseCase
  );
const likeController = new LikeController(likesUseCaseApplicationImpl);

likesRouter.get('/', async (req, res) => {
  await likeController.getLikes(req, res);
});
likesRouter.post('/', async (req, res) => {
    await likeController.createLike(req, res);
  });
export default likesRouter;