import { PostsUseCaseApplication } from "../../application/use-cases/post-usecase";
import express, { Request, Response } from 'express';
import PostEntity from "../../domain/entities/post";

export class PostController {
    private postUseCaseApplication:PostsUseCaseApplication;
  constructor(
     postUseCaseApplication: PostsUseCaseApplication,
  ) {
    this.postUseCaseApplication = postUseCaseApplication;
  }

  async getPosts(req, res: Response) {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.size) || 10;
    const userId = req.userId;
    const posts = await this.postUseCaseApplication.getPosts(page, pageSize,userId);
    console.log(posts[0]);
    res.status(200).json(posts);
  }

  async getPost(req, res: Response) {
    try {
        const page = Number(req.query.page) || 1;
        const size = Number(req.query.size) || 10;
        const userId = req.userId;
  
        const posts: PostEntity[] = await this.postUseCaseApplication.getPosts(page, size, userId);
  
        res.status(200).json(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
      }
  }

  async createPost(req, res: Response) {
    const userId = req.userId;
    console.log(userId);
    const post = req.body as PostEntity;
    const createdPost = await this.postUseCaseApplication.createPost(post,userId);
    res.status(200).json(createdPost);
  }

  async updatePost(req: Request, res: Response) {
    const post = req.body as PostEntity;
    const updatedPost = await this.postUseCaseApplication.updatePost(post);
    res.status(200).json(updatedPost);
  }

  async deletePost(req: Request, res: Response) {
    const id = Number(req.params.id);
    await this.postUseCaseApplication.deletePost(id);
    res.status(200).json();
  }
}