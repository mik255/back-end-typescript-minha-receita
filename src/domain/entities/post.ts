
export default class PostEntity {
    constructor(
      public id: string,
      public userId: string,
      public description: string,
      public recipeId : string,
      public createdAt?: Date,
    ) {}
  }