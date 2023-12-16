export class LikeEntity {
    constructor(
      public readonly postId: string,
      public readonly userId: string,
      public  userName: string,
      public  userImgUrl: string,
      public readonly isUserFollowing: boolean
    ) {}
  }