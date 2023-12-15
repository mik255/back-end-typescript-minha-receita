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
    getLikes(page: number, pageSize: number, postId: String): Promise<LikeEntity[]> {
        return this.likeDataSource.getLikes(page, pageSize, postId);
    }
    createLike(like: LikeEntity): Promise<LikeEntity> {
       return this.likeDataSource.createLike(like);
    }
    deleteLike(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}