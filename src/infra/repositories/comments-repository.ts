import { CommentEntity } from "../../domain/entities/commit";
import { CommitRepository } from "../../domain/repositories/commits-repository";
import { CommentsDataSource } from "../data-source/comments-data-source";

export class CommitRepositoryImp implements CommitRepository {
    commitDatasource: CommentsDataSource;
    constructor(commitDatasource: CommentsDataSource) {
        this.commitDatasource = commitDatasource;
    }
    getCommitsCount(postId: String): Promise<number> {
        return this.commitDatasource.getCommitsCount(postId);
    }
    getCommits(page: number, pageSize: number, postId: String): Promise<CommentEntity[]> {
        return this.commitDatasource.getComments(page, pageSize, postId);
    }
    getCommit(id: number): Promise<CommentEntity> {
        throw new Error("Method not implemented.");
    }
    createCommit(commit: CommentEntity): Promise<CommentEntity> {
        return this.commitDatasource.createComment(commit);
    }
    updateCommit(commit: CommentEntity): Promise<CommentEntity> {
        throw new Error("Method not implemented.");
    }
    deleteCommit(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }


}