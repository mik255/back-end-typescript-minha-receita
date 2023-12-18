import { UserEntity } from "./user";

export class CommentEntity {
    constructor(
        public postId:string,
        public userId:string,
        public readonly comment: string,
        public readonly createdAt: string,
    ) { }
}
