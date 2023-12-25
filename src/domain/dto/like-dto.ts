
export class LikeInputDTO{
    constructor(
        public userId: string,
        public postId: string,
    ){}
}

export class GetLikesByPostIdInputDTO{
    constructor(
        public userId: string,
        public postId: string,
        public page: number,
        public size: number,
    ){}
}
export class LikeOutputDTO{
    constructor(
        public id: string,
        public autorUserId: string,
        public userName: string,
        public avatarUrl: string,
        public userIsFollowing: boolean,
        public createdAt: Date,
    ){}
}