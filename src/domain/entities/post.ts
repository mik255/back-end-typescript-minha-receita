import { LikeEntity } from "./like";

export default class PostEntity {
    constructor(
      public userId: String,
      public userAvatarUrl: String,
      public readonly id: string,
      public readonly recipeId: string,
      public readonly description: string,
      public readonly createdAt: string,
      public listTowFirstLikes?: LikeEntity[],
    ) {}
  }