import { CommentEntity } from "../entities/commit";

export class GetCommentByPostInputDTO{
    constructor(
        public userId: string,
        public postId: string,
        public page: number,
        public size: number,
    ){}
}

export class GetCommentByPostOutputDTO{
    constructor(
        public readonly value: {
             readonly comment: string,
              createdAt: string,
        },
        public readonly user: {
            id: string,
            nome: string,
            avatarUrl: string,
        },
        public userIsFollowing: boolean,
    ){}
}