

import { Schema, Document, model } from 'mongoose';
import { LikeEntity } from '../../domain/entities/like';



const likeSchema = new Schema<LikeEntity>(

    {
        postId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: false,
        },
        userImgUrl: {
            type: String,
            required: false,
        },
        isUserFollowing: {
            type: Boolean,
            required: true,
        },
    }
);

export const LikeSchema = model<LikeEntity>('like', likeSchema);