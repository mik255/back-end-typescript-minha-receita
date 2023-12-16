
import { CommentEntity } from "../../entities/commit";
import { CommitRepository } from "../../repositories/commits-repository";


export interface CommitUseCase {
    getCommits(page: number, pageSize: number, postId: String): Promise<CommentEntity[]>;
    getCommit(id: number): Promise<CommentEntity>;
    createCommit(commit: CommentEntity): Promise<CommentEntity>;
    updateCommit(commit: CommentEntity): Promise<CommentEntity>;
    deleteCommit(id: number): Promise<void>;
    getCommitsCount(postId:String):Promise<Number>;
}

export class CommitUseCaseImpl implements CommitUseCase {
    commitRepository: CommitRepository;
    constructor(commitRepository: CommitRepository) {
        this.commitRepository = commitRepository;
    }
    getCommitsCount(postId: String): Promise<Number> {
        return this.commitRepository.getCommitsCount(postId);
    }
    getCommits(page: number, pageSize: number, postId: String): Promise<CommentEntity[]> {
        return this.commitRepository.getCommits(page, pageSize, postId);
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