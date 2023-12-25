import { GetLikesByPostIdInputDTO, LikeInputDTO, LikeOutputDTO } from "../../dto/like-dto";
import { LikeEntity } from "../../entities/like";
import { LikeRepository } from "../../repositories/likes-repository";
import { AccountUseCase } from "../account/account-usecase";


export interface LikeUseCase {
    getLikes(getLikesByPostIdInputDTO: GetLikesByPostIdInputDTO): Promise<LikeOutputDTO[]>;
    createLike(likeInputDTO: LikeInputDTO): Promise<LikeOutputDTO>;
    deleteLike(id: string,postId:string): Promise<void>;
    userLiked(postId: String, userId: String): Promise<boolean>;
    getCount(postId: String): Promise<number>;
}

export class LikeUseCaseImpl implements LikeUseCase {
    likeRepository: LikeRepository;
    accountUsecase: AccountUseCase;
    constructor(likeRepository: LikeRepository, accountUsecase: AccountUseCase) {
        this.likeRepository = likeRepository;
        this.accountUsecase = accountUsecase;
    }
    getCount(postId: String): Promise<number> {
        return this.likeRepository.getCount(postId);
    }
    userLiked(postId: String, userId: String): Promise<boolean> {
        return this.likeRepository.userLiked(postId, userId);
    }
    async getLikes(getLikesByPostIdInputDTO: GetLikesByPostIdInputDTO): Promise<LikeOutputDTO[]> {
        var likes = await this.likeRepository.getLikes(
            getLikesByPostIdInputDTO.page,
            getLikesByPostIdInputDTO.size,
            getLikesByPostIdInputDTO.postId,
        );

        var promises = likes.map(async like => {
            var user = await this.accountUsecase.getUserById(like.autorUserId);
            return new LikeOutputDTO(
                like.id,
                like.autorUserId,
                user.nome,
                user.avatarUrl,
                like.autorUserId == getLikesByPostIdInputDTO.userId,
                like.createdAt
            );
        });

        var list = await Promise.all(promises);
        //not replicated 
        var uniqueList = list.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.autorUserId === thing.autorUserId
            ))
        )
        return uniqueList;
    }
    async createLike(likeInputDTO: LikeInputDTO): Promise<LikeOutputDTO> {
        
      var user = await this.accountUsecase.getUserById(likeInputDTO.userId);
        var like = await this.likeRepository.createLike(new LikeEntity(
            '',
            likeInputDTO.userId,
            likeInputDTO.postId,
            new Date(),
        ));
            return new LikeOutputDTO(
                like.id,
                user.id,
                user.nome,
                user.avatarUrl,
                like.autorUserId == user.id,
                like.createdAt
            );
    }
    deleteLike(id: string,postId:string): Promise<void> {
        
        return this.likeRepository.deleteLike(id,postId);
    }

}