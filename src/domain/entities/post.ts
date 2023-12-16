import { LikeEntity } from "./like";

export default class PostEntity {
    constructor(
      public userId: String,

      public userAvatarUrl: String | null,
      public imgUrlList:String[] | [],
      public likesCount: number | 0,
      public commentsCount: Number | 0,
      public userLiked: boolean | false,
      public name: string | null,

      public readonly id: string,
      public readonly recipeId: string,
      public readonly description: string,
      public readonly createdAt: string,
      public listTowFirstLikes?: LikeEntity[] | [],
    ) {}
  }