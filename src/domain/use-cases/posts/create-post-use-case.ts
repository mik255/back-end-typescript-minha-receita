import PostEntity from "../../entities/post";
import { IPostsRepository } from "../../repositories/posts-repository";

export interface PostUseCase {
    getPosts(page: number, pageSize: number,userId:String): Promise<PostEntity[]>;
    getPost(id: number): Promise<PostEntity>;
    createPost(post: PostEntity,userId:String): Promise<PostEntity>;
    updatePost(post: PostEntity): Promise<PostEntity>;
}

export class PostUseCaseImpl implements PostUseCase {
    postsRepository: IPostsRepository;
    constructor(postsRepository: IPostsRepository) {
        this.postsRepository = postsRepository;
    }
    getPosts(page: number, pageSize: number,userId:String): Promise<PostEntity[]> {
        return this.postsRepository.getPosts(page, pageSize,userId);
    }
    getPost(id: number): Promise<PostEntity> {
        return this.postsRepository.getPost(id);
    }
    createPost(post: PostEntity,userId:String): Promise<PostEntity> {
        
        return this.postsRepository.createPost(post,userId);
    }
    updatePost(post: PostEntity): Promise<PostEntity> {
       return this.postsRepository.updatePost(post);
    }

}