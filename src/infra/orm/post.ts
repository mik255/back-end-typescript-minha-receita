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
        listTowFirstLikes: [
            {
              type: [
                 LikeSchema.schema.obj,
              ]
            },
          ],
    },
    { timestamps: true } // Adiciona automaticamente os campos `createdAt` e `updatedAt`
);

export const PostSchema = model<PostEntity>('Post', postSchema);
