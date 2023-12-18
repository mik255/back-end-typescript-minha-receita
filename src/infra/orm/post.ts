import { Schema, model } from 'mongoose';
import PostEntity from '../../domain/entities/post';

const postSchema = new Schema<PostEntity>(
    {
        userId: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        recipeId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } 
);

export const PostSchema = model<PostEntity>('Post', postSchema);
