
import PostEntity from "../../domain/entities/post";
import { LikeUseCase } from "../../domain/use-cases/like/like-usecase";
import { PostUseCase } from "../../domain/use-cases/posts/create-post-use-case";



export interface PostsUseCaseApplication {
    getPosts(page: Number, size: Number, userId: String): Promise<PostEntity[]>
    createPost(post: PostEntity, userId: String): Promise<PostEntity>
    updatePost(post: PostEntity): Promise<PostEntity>
    deletePost(id: number): Promise<void>
}

export class PostsUseCaseApplicationImpl implements PostsUseCaseApplication {
    private postUsecases: PostUseCase;
    private likeUsecases: LikeUseCase;
    constructor(postUsecases: PostUseCase, likeUsecases: LikeUseCase) {
        this.postUsecases = postUsecases;
        this.likeUsecases = likeUsecases;
    }
    updatePost(post: PostEntity): Promise<PostEntity> {
        throw new Error("Method not implemented.");
    }
    deletePost(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async getPosts(page: number, size: number, userId: String): Promise<PostEntity[]> {
        var resultPostList = await this.postUsecases.getPosts(page, size, userId) as PostEntity[];
        const promises = resultPostList.map(async (post)=>{
            post.listTowFirstLikes = await this.likeUsecases.getLikes(1, 2, post.id);
            return post;
        });

        // Aguarda todas as promessas serem resolvidas
        const postsWithLikes = await Promise.all(promises);
        return postsWithLikes;

    }

    async createPost(post: PostEntity, userId: String): Promise<PostEntity> {
        return await this.postUsecases.createPost(post, userId);
    }
}