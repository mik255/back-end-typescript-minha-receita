import { CommentEntity } from "../../domain/entities/commit";
import { CommentSchema } from "../orm/comment";

export interface CommentsDataSource{
    getComments(page: number, pageSize: number,postId:String): Promise<CommentEntity[]>;
    getComment(id: number): Promise<CommentEntity>;
    createComment(comment: CommentEntity): Promise<CommentEntity>;
    updateComment(comment: CommentEntity): Promise<CommentEntity>;
    deleteComment(id: number): Promise<void>;
    getCommitsCount(postId:String):Promise<number>;

}

export class CommentsDataSourceImpl implements CommentsDataSource{
    async getCommitsCount(postId: String): Promise<number> {
       return await CommentSchema.countDocuments({postId:postId});
    }

    async getComments(page: number, pageSize: number,postId:String): Promise<CommentEntity[]> {
        const skip = (page - 1) * pageSize; // Calcula o número de documentos a serem pulados
        const list = await CommentSchema.find().skip(skip).limit(pageSize).where('postId').equals(postId);
        const commentsObjects = list.map((element) => element.toObject());
        return commentsObjects??[];
    }
    getComment(id: number): Promise<CommentEntity> {
        throw new Error("Method not implemented.");
    }
    createComment(comment: CommentEntity): Promise<CommentEntity> {
       return CommentSchema.create(comment);
    }
    updateComment(comment: CommentEntity): Promise<CommentEntity> {
        throw new Error("Method not implemented.");
    }
    deleteComment(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}