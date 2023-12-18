import { UserEntity } from "./user";

export class LikeEntity {
    constructor(
      public id: string,
      public autorUserId: string,
      public postId: string,
      public createdAt: Date,
    ) {}
  }