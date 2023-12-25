import { LikeEntity } from "../../domain/entities/like";
import { LikeSchema } from "../orm/like";

export interface LikeDataSource {
    getLikes(page: number, pageSize: number, postId: String): Promise<LikeEntity[]>;
    createLike(like: LikeEntity): Promise<LikeEntity>;
    deleteLike(id: string,postId:string): Promise<void>;
    userLiked(postId: String, userId: String): Promise<boolean>;
    getCount(postId: String): Promise<number>;
}

export class LikeDataSourceImpl implements LikeDataSource {
    async getCount(postId: String): Promise<number> {
        const result = await LikeSchema.aggregate([
            { $match: { postId: postId } },
            { $group: { _id: "$authorUserId" } },
            { $group: { _id: null, count: { $sum: 1 } } }
          ]);
        
          if (result.length > 0) {
            return result[0].count;
          } else {
            return 0; // Se não houver resultados, retorna 0
          }
    }
    async userLiked(postId: String, userId: String): Promise<boolean> {
        return (await LikeSchema.exists({ postId: postId, autorUserId: userId })) ? true : false;
    }

    async getLikes(page: number, pageSize: number, postId: string): Promise<LikeEntity[]> {
        const skip = (page - 1) * pageSize;
        const list = await LikeSchema.find({ postId }).sort({ createdAt: -1 }).skip(skip).limit(pageSize);
    
        return list;
    }
    
    async createLike(like: LikeEntity): Promise<LikeEntity> {
        var result = await LikeSchema.create(like);
        return result.toObject();
    }
    async deleteLike(id: string,postId:string): Promise<void> {
        console.log('teste',id);
       await LikeSchema.deleteOne({ _id: id,postId:postId });
    }

}
