import { LikeEntity } from "../../domain/entities/like";
import { LikeRepository } from "../../domain/repositories/likes-repository";
import { AccountUseCase } from "../../domain/use-cases/account/account-usecase";
import { LikeUseCase } from "../../domain/use-cases/like/like-usecase";
import { AccountUseCaseApplicationImpl } from "./account-usecases";

export interface LikesUseCaseApplication {
    getLikes(page: number, pageSize: number, postId: String): Promise<LikeEntity[]>;
    createLike(like: LikeEntity): Promise<LikeEntity>;
    deleteLike(id: number): Promise<void>;
    userLiked(postId: String, userId: String): Promise<boolean>;
    getCount(postId: String): Promise<number>;
}

export class LikesUseCaseApplicationImpl implements LikesUseCaseApplication {
    likeUseCase: LikeUseCase;
    accountUseCase: AccountUseCaseApplicationImpl;

    constructor(likeUseCase: LikeUseCase, accountUseCase: AccountUseCaseApplicationImpl) {
        this.likeUseCase = likeUseCase;
        this.accountUseCase = accountUseCase;
    }
    getCount(postId: String): Promise<number> {
        return this.likeUseCase.getCount(postId);
    }
    userLiked(postId: String, userId: String): Promise<boolean> {
        return this.likeUseCase.userLiked(postId, userId);
    }

    async getLikes(page: number, pageSize: number, postId: String): Promise<LikeEntity[]> {
        var likes = await this.likeUseCase.getLikes(page, pageSize, postId);
        var promises = likes.map(async (like) => {
            const user = await this.accountUseCase.getUserById(like.userId);
            like.userImgUrl = user.avatarUrl;
            like.userName = user.nome;
            return like;
        }
        );
        const result = await Promise.all(promises);
        return result;
    }

    createLike(like: LikeEntity): Promise<LikeEntity> {
        return this.likeUseCase.createLike(like);
    }

    deleteLike(id: number): Promise<void> {
        return this.likeUseCase.deleteLike(id);
    }

}