import { LikeEntity } from "../../domain/entities/like";
import PostEntity from "../../domain/entities/post";
import { LikeRepository } from "../../domain/repositories/likes-repository";
import { IPostsRepository } from "../../domain/repositories/posts-repository";
import { LikeDataSource } from "../data-source/like-data-source";
import { IPostsDataSource } from "../data-source/post-data-source";


export class LikeRepositoryImpl implements LikeRepository{
    likeDataSource: LikeDataSource;
    constructor(likeDataSource: LikeDataSource) {
        this.likeDataSource = likeDataSource;
    }
    getCount(postId: String): Promise<number> {
        return this.likeDataSource.getCount(postId);
    }
    userLiked(postId: String, userId: String): Promise<boolean> {
        return this.likeDataSource.userLiked(postId, userId);
    }
    getLikes(page: number, pageSize: number, postId: String): Promise<LikeEntity[]> {
        return this.likeDataSource.getLikes(page, pageSize, postId);
    }
    createLike(like: LikeEntity): Promise<LikeEntity> {
       return this.likeDataSource.createLike(like);
    }
    deleteLike(id: string,postId:string): Promise<void> {
        return this.likeDataSource.deleteLike(id,postId);
    }

}