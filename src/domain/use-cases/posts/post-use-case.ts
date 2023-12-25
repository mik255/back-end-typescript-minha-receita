import { FileOutputDTO } from "../../dto/file-dto";
import { GetLikesByPostIdInputDTO, LikeInputDTO } from "../../dto/like-dto";
import { CreatePostsImputDTO, GetPostsImputDTO, defaultPostOutputDTO } from "../../dto/post-dto";
import PostEntity from "../../entities/post";
import { IPostsRepository } from "../../repositories/posts-repository";
import { AccountUseCase } from "../account/account-usecase";
import { CommitUseCase } from "../commit/commit-usecase";
import { LikeUseCase } from "../like/like-usecase";
import { RecipeUseCase } from "../recipe/recipe-use-cases";

export interface PostUseCase {
    getPosts(getPostsImputDTO: GetPostsImputDTO): Promise<defaultPostOutputDTO[]>;
    getPost(id: number): Promise<PostEntity>;
    createPost(createPostsImputDTO: CreatePostsImputDTO): Promise<defaultPostOutputDTO>;
    updatePost(post: PostEntity): Promise<PostEntity>;
}

export class PostUseCaseImpl implements PostUseCase {
    postsRepository: IPostsRepository;
    likesUsecase: LikeUseCase;
    commentsUsecase: CommitUseCase;
    recipeUsecase: RecipeUseCase;
    accountUsecase: AccountUseCase;
    constructor(
        postsRepository: IPostsRepository,
        likesUsecase: LikeUseCase,
        commentsUsecase: CommitUseCase,
        recipeUsecase: RecipeUseCase,
        accountUsecase: AccountUseCase,
        ) {

        this.postsRepository = postsRepository;
        this.likesUsecase = likesUsecase;
        this.commentsUsecase = commentsUsecase;
        this.recipeUsecase = recipeUsecase;
        this.accountUsecase = accountUsecase;
    }
    async getPosts(getPostsImputDTO: GetPostsImputDTO): Promise<defaultPostOutputDTO[]> {
        var posts = await this.postsRepository.getPosts(
            getPostsImputDTO.page,
            getPostsImputDTO.size,
        );
        
        var promises = posts.map(async post => {
            var likesDto = await this.likesUsecase.getLikes(new GetLikesByPostIdInputDTO(
                getPostsImputDTO.userId,
                post.id,
                1,
                2,
            )
            );
            var likescount = (await this.likesUsecase.getCount(post.id));
            var userHasLiked = await this.likesUsecase.userLiked(post.id, getPostsImputDTO.userId);
            var commentscount = await this.commentsUsecase.getCommitsCount(post.id);
            var recipeDto = await this.recipeUsecase.getRecipeById(post.recipeId);
            var user = await this.accountUsecase.getUserById(post.userId);
            return new defaultPostOutputDTO(
                post.id,
                post.description,
                post.createdAt,
                likesDto,
                likescount,
                commentscount,
                recipeDto.recipeImgUrlList.map(recipeImgUrl => new FileOutputDTO(recipeImgUrl)),
                recipeDto.id,
                userHasLiked,
                {
                    id: user.id,
                    nome: user.nome,
                    avatarUrl: user.avatarUrl,
                    email: user.credentials.email,
                    description: 'Master chefe'
                }
            )
        });

        return await Promise.all(promises);
    }
    getPost(id: number): Promise<PostEntity> {
        return this.postsRepository.getPost(id);
    }
    async createPost(createPostsImputDTO: CreatePostsImputDTO): Promise<defaultPostOutputDTO> {
        console.log('createPostsImputDTO', createPostsImputDTO);
        var post = new PostEntity(
            '',
            createPostsImputDTO.userId,
            createPostsImputDTO.description,
            createPostsImputDTO.recipeId,
        );
        var postResult = await this.postsRepository.createPost(post, createPostsImputDTO.userId);

        var likesDto = (await this.likesUsecase.getLikes(
            new GetLikesByPostIdInputDTO(
                createPostsImputDTO.userId,
                postResult.id,
                1,
                2,
            )
        ));
        var likescount = 0;
        var commentscount = 0;
        var recipeDto = await this.recipeUsecase.getRecipeById(postResult.recipeId);
        var user = await this.accountUsecase.getUserById(post.userId);
        return new defaultPostOutputDTO(
            post.id,
            post.description,
            postResult.createdAt,
            likesDto,
            likescount,
            commentscount,
            recipeDto.recipeImgUrlList.map(recipeImgUrl => new FileOutputDTO(recipeImgUrl)),
            recipeDto.id,
            user.id == createPostsImputDTO.userId,
             {
                id: user.id,
                nome: user.nome,
                avatarUrl: user.avatarUrl,
                email: user.credentials.email,
                description: 'Master chefe'
            }
        )
    }
    updatePost(post: PostEntity): Promise<PostEntity> {
        return this.postsRepository.updatePost(post);
    }

}