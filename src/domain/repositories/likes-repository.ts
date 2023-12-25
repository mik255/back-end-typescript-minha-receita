import { LikeEntity } from "../entities/like";

export interface LikeRepository {
    getLikes(page: number, pageSize: number,postId:String): Promise<LikeEntity[]>;
    createLike(like: LikeEntity): Promise<LikeEntity>;
    deleteLike(id: string,postId:string): Promise<void>;
    userLiked(postId:String,userId:String):Promise<boolean>;
    getCount(postId:String):Promise<number>;
}