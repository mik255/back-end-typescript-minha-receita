

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
        isUserFollowing: {
            type: Boolean,
            required: true,
        },
    }
);

export const LikeSchema = model<LikeEntity>('like', likeSchema);