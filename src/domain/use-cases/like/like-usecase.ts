import { LikeEntity } from "../../entities/like";
import { LikeRepository } from "../../repositories/likes-repository";


export interface LikeUseCase {
    getLikes(page: number, pageSize: number,postId:String): Promise<LikeEntity[]>;
    createLike(like: LikeEntity): Promise<LikeEntity>;
    deleteLike(id: number): Promise<void>;
}

export class LikeUseCaseImpl implements LikeUseCase {
    likeRepository: LikeRepository;
    constructor(likeRepository: LikeRepository) {
        this.likeRepository = likeRepository;
    }
    getLikes(page: number, pageSize: number,postId:String): Promise<LikeEntity[]> {
        return this.likeRepository.getLikes(page, pageSize,postId);
    }
    createLike(like: LikeEntity): Promise<LikeEntity> {
        return this.likeRepository.createLike(like);
    }
    deleteLike(id: number): Promise<void> {
        return this.likeRepository.deleteLike(id);
    }

}