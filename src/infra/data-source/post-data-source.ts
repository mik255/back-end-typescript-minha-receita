import e from "express";
import PostEntity from "../../domain/entities/post";
import { PostSchema } from "../orm/post";


export interface IPostsDataSource {
    getPosts(page: number, pageSize: number, userId: String): Promise<PostEntity[]>;
    getPost(id: number): Promise<PostEntity>;
    createPost(post: PostEntity, userId: String): Promise<PostEntity>;
    updatePost(post: PostEntity): Promise<PostEntity>;
    deletePost(id: number): Promise<void>;
}

export class PostsDataSourceImpl implements IPostsDataSource {
    async getPosts(page: number, pageSize: number, userId: String): Promise<PostEntity[]> {
        const skip = (page - 1) * pageSize; // Calcula o número de documentos a serem pulados

        const posts = await PostSchema.find().skip(skip).limit(pageSize).where('userId').equals(userId);
        const postsObjects = posts.map((postsElement) => {
            var index = posts.indexOf(postsElement);
            posts[index].id = postsElement._id;
            return posts[index];

        });
        return postsObjects;
    }
    getPost(id: number): Promise<PostEntity> {
        throw new Error("Method not implemented.");
    }
    async createPost(post: PostEntity, userId: String): Promise<PostEntity> {
        post.userId = userId;

        const newPost = await PostSchema.create(post);
        return newPost.toObject();
    }
    updatePost(post: PostEntity): Promise<PostEntity> {
        throw new Error("Method not implemented.");
    }
    deletePost(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}