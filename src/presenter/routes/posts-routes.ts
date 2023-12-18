import express from 'express';
import { RecipeUseCase } from '../../domain/use-cases/recipe/recipe-use-cases';
import { RecipeRepositoryImpl } from '../../infra/repositories/recipe-repository-impl';
import { RecipeDatasourceImpl } from '../../infra/data-source/recipe-data-source';;
import { PostUseCaseImpl } from '../../domain/use-cases/posts/post-use-case';
import { PostsRepositoryImpl } from '../../infra/repositories/post-repository-impl';
import { PostsDataSourceImpl } from '../../infra/data-source/post-data-source';
import { PostController } from '../controllers/post-controller';
import { LikeUseCaseImpl } from '../../domain/use-cases/like/like-usecase';
import { LikeRepositoryImpl } from '../../infra/repositories/like-repository-impl';
import { LikeDataSourceImpl } from '../../infra/data-source/like-data-source';
import { CommitUseCaseImpl } from '../../domain/use-cases/commit/commit-usecase';
import { CommitRepositoryImp } from '../../infra/repositories/comments-repository';
import { CommentsDataSourceImpl } from '../../infra/data-source/comments-data-source';
import { AccountUseCaseImpl } from '../../domain/use-cases/account/account-usecase';
import { AccountRepositoryImpl } from '../../infra/repositories/account-repository';
import { AccountDataSourceImpl } from '../../infra/data-source/account-data-source';
import { ImgBufferServiceImpl } from '../../infra/services/image-service-impl';
import { jwtMiddlewareService } from '../middlewares/jwt';
import { ImgBase64ServiceImpl } from '../../infra/services/image-base64-service';

const postRouter = express.Router();
//domain services


const commitUseCase = new CommitUseCaseImpl(new CommitRepositoryImp(new CommentsDataSourceImpl()));
const accountUsecase = new AccountUseCaseImpl(
  new AccountRepositoryImpl(
    new AccountDataSourceImpl()
  ),
  new ImgBase64ServiceImpl(),
  jwtMiddlewareService,
);
const likeUseCase = new LikeUseCaseImpl(new LikeRepositoryImpl(new LikeDataSourceImpl()), accountUsecase);
const recipeUsecase = new RecipeUseCase(new RecipeRepositoryImpl(new RecipeDatasourceImpl()),
  new ImgBase64ServiceImpl()
);
const postUseCase = new PostUseCaseImpl(new PostsRepositoryImpl(new PostsDataSourceImpl()),
  likeUseCase, commitUseCase, recipeUsecase, accountUsecase);
const controller = new PostController(
  postUseCase,
);


postRouter.get('/', async (req, res) => {
  await controller.getPosts(req, res);
});
postRouter.post('/', async (req, res) => {
  await controller.createPost(req, res);
});
export default postRouter;