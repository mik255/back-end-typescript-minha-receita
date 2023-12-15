import { CommentEntity } from "../../domain/entities/commit";
import { CommitRepository } from "../../domain/repositories/commits-repository";

export interface CommitUseCases {
    getCommits(page: number, pageSize: number,postId:String): Promise<CommentEntity[]>;
    getCommit(id: number): Promise<CommentEntity>;
    createCommit(commit: CommentEntity): Promise<CommentEntity>;
    updateCommit(commit: CommentEntity): Promise<CommentEntity>;
    deleteCommit(id: number): Promise<void>;
}

export class CommitUseCasesApplicationImpl implements CommitUseCases {
    commitRepository: CommitRepository;
    constructor(commitRepository: CommitRepository) {
        this.commitRepository = commitRepository;
    }
    getCommits(page: number, pageSize: number,postId:String): Promise<CommentEntity[]> {
        return this.commitRepository.getCommits(page, pageSize,postId);

    }
    getCommit(id: number): Promise<CommentEntity> {
        return this.commitRepository.getCommit(id);
    }
    createCommit(commit: CommentEntity): Promise<CommentEntity> {
        return this.commitRepository.createCommit(commit);
    }
    updateCommit(commit: CommentEntity): Promise<CommentEntity> {
        return this.commitRepository.updateCommit(commit);
    }
    deleteCommit(id: number): Promise<void> {
        return this.commitRepository.deleteCommit(id);
    }

}