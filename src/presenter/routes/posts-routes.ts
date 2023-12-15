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


const postRouter = express.Router();
const postsUseCaseApplicationImpl = new PostsUseCaseApplicationImpl(
    new PostUseCaseImpl(new PostsRepositoryImpl(new PostsDataSourceImpl())),
    new LikeUseCaseImpl(new LikeRepositoryImpl(new LikeDataSourceImpl()))
  );
const postsController = new PostController(postsUseCaseApplicationImpl);

postRouter.get('/', async (req, res) => {
  await postsController.getPosts(req, res);
});
postRouter.post('/', async (req, res) => {
    await postsController.createPost(req, res);
  });
export default postRouter;