import express, { Request, Response } from 'express';
import PostEntity from "../../domain/entities/post";
import { PostUseCase } from '../../domain/use-cases/posts/post-use-case';
import { CreatePostsImputDTO, GetPostsImputDTO } from '../../domain/dto/post-dto';

export class PostController {
    private postUsecase:PostUseCase;
  constructor(
    postUsecase: PostUseCase,
  ) {
    this.postUsecase = postUsecase;
  }

  async getPosts(req, res: Response) {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.size) || 10;
    const userId = req.userId;
    const inputDto = new GetPostsImputDTO(page, pageSize, userId);
    const posts = await this.postUsecase.getPosts(inputDto);
    res.status(200).json(posts);
  }

  async getPost(req, res: Response) {
    try {
        // const page = Number(req.query.page) || 1;
        // const size = Number(req.query.size) || 10;
        // const userId = req.userId;
  
        // const posts: PostEntity[] = await this.postUsecase.getPosts(page, size, userId);
  
        res.status(200).json({});
      } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
      }
  }

  async createPost(req, res: Response) {
    const userId = req.userId;
    console.log('user id',userId);
    const post = req.body;
    const inputDto = new CreatePostsImputDTO(
      userId,
      post.description,
      post.recipeId,
    );
    const createdPost = await this.postUsecase.createPost(inputDto);
    res.status(200).json(createdPost);
  }

  async updatePost(req: Request, res: Response) {
    const post = req.body as PostEntity;
    const updatedPost = await this.postUsecase.updatePost(post);
    res.status(200).json(updatedPost);
  }

  async deletePost(req: Request, res: Response) {
    const id = Number(req.params.id);
   // await this.postUsecase.deletePost(id);
    res.status(200).json({});
  }
}