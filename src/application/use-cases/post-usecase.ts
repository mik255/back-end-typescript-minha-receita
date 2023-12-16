
import PostEntity from "../../domain/entities/post";
import { CommitUseCase } from "../../domain/use-cases/commit/commit-usecase";
import { LikeUseCase } from "../../domain/use-cases/like/like-usecase";
import { PostUseCase } from "../../domain/use-cases/posts/create-post-use-case";
import { AccountUseCaseApplication } from "./account-usecases";
import { LikesUseCaseApplication } from "./likes-usecases";
import { RecipeUseCaseApplication } from "./recipe-usecase";

export interface PostsUseCaseApplication {
    getPosts(page: Number, size: Number, userId: String): Promise<PostEntity[]>
    createPost(post: PostEntity, userId: String): Promise<PostEntity>
    updatePost(post: PostEntity): Promise<PostEntity>
    deletePost(id: number): Promise<void>
}

export class PostsUseCaseApplicationImpl implements PostsUseCaseApplication {
    private postUsecases: PostUseCase;
    private likeAppUsecases: LikesUseCaseApplication;
    private commentsUsecases: CommitUseCase;
    private accountAppUsecases: AccountUseCaseApplication;
    private recipeAppUsecases: RecipeUseCaseApplication;
    constructor(
        postUsecases: PostUseCase,
        likeUsecases: LikesUseCaseApplication,
        commentsUsecases: CommitUseCase,
        accountAppUsecases: AccountUseCaseApplication,
        recipeAppUsecases: RecipeUseCaseApplication
    ) {
        this.postUsecases = postUsecases;
        this.likeAppUsecases = likeUsecases;
        this.commentsUsecases = commentsUsecases;
        this.accountAppUsecases = accountAppUsecases;
        this.recipeAppUsecases = recipeAppUsecases;
    }
    updatePost(post: PostEntity): Promise<PostEntity> {
        throw new Error("Method not implemented.");
    }
    deletePost(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async getPosts(page: number, size: number, userId: String): Promise<PostEntity[]> {
        var resultPostList = await this.postUsecases.getPosts(page, size, userId) as PostEntity[];
        const promises = resultPostList.map(async (post) => {
            const [
                listTowFirstLikes,
                commentsCount,
                likesCount,
                userLiked,
                postRecipe
            ] = await Promise.all([
                this.likeAppUsecases.getLikes(1, 2, post.id),
                this.commentsUsecases.getCommitsCount(post.id),
                this.likeAppUsecases.getCount(post.id),
                this.likeAppUsecases.userLiked(post.id, userId),
                this.recipeAppUsecases.getRecipeById(post.recipeId)
            ]);

            post.listTowFirstLikes = listTowFirstLikes;
            post.commentsCount = commentsCount;
            post.likesCount = likesCount;
            post.userLiked = userLiked;
            post.imgUrlList = postRecipe.recipeImgUrlList

            return post;
        });

        const posts = await Promise.all(promises);
        return posts;

    }

    async createPost(post: PostEntity, userId: string): Promise<PostEntity> {
        console.log(userId);
        var user = await this.accountAppUsecases.getUserById(userId);
        console.log(user);
        post.userAvatarUrl = user.avatarUrl;
        post.name = user.nome;

        var result = await this.postUsecases.createPost(post, userId);
        return result;

    }
}