import { FileInputDTO, FileOutputDTO } from "./file-dto";
import { LikeOutputDTO } from "./like-dto";

export class defaultPostOutputDTO {
    constructor(
        public id: string,
        public description: string,
        public createdAt: Date,
        public towFirstLikes: LikeOutputDTO[],
        public likesCount: number,
        public commentsCount: number,
        public recipeImageUrl: FileOutputDTO[],
        public recipeId: string,
        public userLiked:boolean,
        public userData: {
            id: string,
            nome: string,
            avatarUrl: string,
            email: string,
            description: 'Master chefe'
        }
    ) { }
}

export class getPostsByUserIdImputDTO {
    constructor(
        public userId: string
    ) { }
}

export class CreatePostsImputDTO {
    constructor(
        public userId: string,
        public description: string,
        public recipeId: string
    ) { }
}

export class GetPostsImputDTO {
    constructor(
        public page: number,
        public size: number,
        public userId: string
    ) { }
}

