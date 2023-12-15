import PostEntity from "../../domain/entities/post";
import { IPostsRepository } from "../../domain/repositories/posts-repository";
import { IPostsDataSource } from "../data-source/post-data-source";


export class PostsRepositoryImpl implements IPostsRepository{
    iPostsDataSource: IPostsDataSource;
    constructor(iPostsDataSource: IPostsDataSource) {
        this.iPostsDataSource = iPostsDataSource;
    }
    getPosts(page: number, pageSize: number,userId:String): Promise<PostEntity[]> {
        return this.iPostsDataSource.getPosts(page, pageSize,userId);
    }
    getPost(id: number): Promise<PostEntity> {
        throw new Error("Method not implemented.");
    }
    async createPost(post: PostEntity,userId:String): Promise<PostEntity> {
        
       return await this.iPostsDataSource.createPost(post,userId);
    }
    updatePost(post: PostEntity): Promise<PostEntity> {
        throw new Error("Method not implemented.");
    }
    deletePost(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}