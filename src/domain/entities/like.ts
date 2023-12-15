export class LikeEntity {
    constructor(
      public readonly postId: string,
      public readonly userId: string,
      public readonly isUserFollowing: boolean
    ) {}
  }