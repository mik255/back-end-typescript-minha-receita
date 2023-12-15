import { LikeEntity } from "../entities/like";

export interface LikeRepository {
    getLikes(page: number, pageSize: number,postId:String): Promise<LikeEntity[]>;
    createLike(like: LikeEntity): Promise<LikeEntity>;
    deleteLike(id: number): Promise<void>;
}