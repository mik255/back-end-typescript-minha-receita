import PostEntity from "../entities/post";

export interface IPostsRepository {
    getPosts(page: number, pageSize: number,userId:String): Promise<PostEntity[]>;
    getPost(id: number): Promise<PostEntity>;
    createPost(post: PostEntity,userId:String): Promise<PostEntity>;
    updatePost(post: PostEntity): Promise<PostEntity>;
    deletePost(id: number): Promise<void>;
}