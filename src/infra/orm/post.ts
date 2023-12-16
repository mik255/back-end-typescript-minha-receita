import { Schema, model } from 'mongoose';
import PostEntity from '../../domain/entities/post';
import { LikeSchema } from './like';

const postSchema = new Schema<PostEntity>(
    {
        userId: {
            type: String,
            required: true,
        },
        recipeId: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        userAvatarUrl: {
            type: String,
            required: false,
        },
        imgUrlList: {
            type: [String],
            required: true,
            default: []
        },
        likesCount: {
            type: Number,
            required: true,
            default: 0
        },
        commentsCount: {
            type: Number,
            required: true,
            default: 0
        },
        userLiked: {
            type: Boolean,
            required: true,
            default: false
        },
        name: {
            type: String,
            required: true,
        },
        listTowFirstLikes: 
            {
                type: [
                    LikeSchema.schema.obj,
                ],
            },
    },
    { timestamps: true } 
);

export const PostSchema = model<PostEntity>('Post', postSchema);
