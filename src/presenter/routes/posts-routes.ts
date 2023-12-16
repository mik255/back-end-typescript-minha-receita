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
import { CommitUseCaseImpl } from '../../domain/use-cases/commit/commit-usecase';
import { CommitRepositoryImp } from '../../infra/repositories/comments-repository';
import { CommentsDataSourceImpl } from '../../infra/data-source/comments-data-source';
import { LikesUseCaseApplicationImpl } from '../../application/use-cases/likes-usecases';
import { AccountUseCaseImpl } from '../../domain/use-cases/account/account-usecase';
import { AccountRepositoryImpl } from '../../infra/repositories/account-repository';
import { AccountDataSourceImpl } from '../../infra/data-source/account-data-source';


const postRouter = express.Router();
//domain services
const postUseCase = new PostUseCaseImpl(new PostsRepositoryImpl(new PostsDataSourceImpl()));
const accountUseCase = new AccountUseCaseImpl(new AccountRepositoryImpl(new AccountDataSourceImpl()));
const likeUseCase = new LikeUseCaseImpl(new LikeRepositoryImpl(new LikeDataSourceImpl()));
const commitUseCase = new CommitUseCaseImpl(new CommitRepositoryImp(new CommentsDataSourceImpl()));
const recipeUseCaseApplication = new RecipeUseCaseApplication(new RecipeUseCase(new RecipeRepositoryImpl(new RecipeDatasourceImpl())));
//application services
const likeAppUseCase = new LikesUseCaseApplicationImpl(likeUseCase, accountUseCase);
const accountAppUsecases = new AccountUseCaseImpl(new AccountRepositoryImpl(new AccountDataSourceImpl()));

const postsUseCaseApplicationImpl = new PostsUseCaseApplicationImpl(
  postUseCase,
  likeAppUseCase,
  commitUseCase,
  accountAppUsecases,
  recipeUseCaseApplication
  );
const postsController = new PostController(postsUseCaseApplicationImpl);

postRouter.get('/', async (req, res) => {
  await postsController.getPosts(req, res);
});
postRouter.post('/', async (req, res) => {
    await postsController.createPost(req, res);
  });
export default postRouter;