import { LikeEntity } from "../../domain/entities/like";
import { LikeSchema } from "../orm/like";

export interface LikeDataSource {
    getLikes(page: number, pageSize: number, postId: String): Promise<LikeEntity[]>;
    createLike(like: LikeEntity): Promise<LikeEntity>;
    deleteLike(id: number): Promise<void>;
    userLiked(postId: String, userId: String): Promise<boolean>;
    getCount(postId: String): Promise<number>;
}

export class LikeDataSourceImpl implements LikeDataSource {
    async getCount(postId: String): Promise<number> {
        return LikeSchema.countDocuments({ postId: postId });
    }
    async userLiked(postId: String, userId: String): Promise<boolean> {
        return (await LikeSchema.exists({ postId: postId, autorUserId: userId })) ? true : false;
    }

    async getLikes(page: number, pageSize: number, postId: string): Promise<LikeEntity[]> {
        const skip = (page - 1) * pageSize;
        const list = await LikeSchema.find({ postId }).skip(skip).limit(pageSize);
    
        return list;
    }
    
    async createLike(like: LikeEntity): Promise<LikeEntity> {
        var result = await LikeSchema.create(like);
        return result.toObject();
    }
    deleteLike(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
