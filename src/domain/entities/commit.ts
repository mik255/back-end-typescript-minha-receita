
export class CommentEntity {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly postId: string,
        public readonly userName: string,
        public readonly userImgUrl: string,
        public readonly comment: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
    ) { }
}
