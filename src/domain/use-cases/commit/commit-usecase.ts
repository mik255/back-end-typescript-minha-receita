
import { GetCommentByPostInputDTO, GetCommentByPostOutputDTO } from "../../dto/comment";
import { CommentEntity } from "../../entities/commit";
import { CommitRepository } from "../../repositories/commits-repository";
import { AccountUseCase } from "../account/account-usecase";


export interface CommitUseCase {
    getCommits(getCommentByPostInputDTO: GetCommentByPostInputDTO): Promise<GetCommentByPostOutputDTO[]>;
    getCommit(id: number): Promise<CommentEntity>;
    createCommit(commit: CommentEntity): Promise<CommentEntity>;
    updateCommit(commit: CommentEntity): Promise<CommentEntity>;
    deleteCommit(id: number): Promise<void>;
    getCommitsCount(postId: String): Promise<number>;
}

export class CommitUseCaseImpl implements CommitUseCase {
    commitRepository: CommitRepository;
    accountUsecase: AccountUseCase;
    constructor(commitRepository: CommitRepository) {
        this.commitRepository = commitRepository;
    }
    getCommitsCount(postId: String): Promise<number> {
        return this.commitRepository.getCommitsCount(postId);
    }
    async getCommits(getCommentByPostInputDTO: GetCommentByPostInputDTO): Promise<GetCommentByPostOutputDTO[]> {
        var page = getCommentByPostInputDTO.page;
        var pageSize = getCommentByPostInputDTO.size;
        var postId = getCommentByPostInputDTO.postId;

        var commits = await this.commitRepository.getCommits(page, pageSize, postId);

        var promises = commits.map(async commit => {
            var user = await this.accountUsecase.getUserById(commit.userId);
            return new GetCommentByPostOutputDTO(
                commit,
                user,
                user.id == getCommentByPostInputDTO.userId
            );
        });

        return await Promise.all(promises);
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