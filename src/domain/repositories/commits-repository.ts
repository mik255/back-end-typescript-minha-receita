import { CommentEntity } from "../entities/commit";

export interface CommitRepository {
    getCommits(page: number, pageSize: number,postId:String): Promise<CommentEntity[]>;
    getCommit(id: number): Promise<CommentEntity>;
    createCommit(commit: CommentEntity): Promise<CommentEntity>;
    updateCommit(commit: CommentEntity): Promise<CommentEntity>;
    deleteCommit(id: number): Promise<void>;
    getCommitsCount(postId:String):Promise<Number>;
}