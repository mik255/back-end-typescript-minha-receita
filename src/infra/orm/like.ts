import { Schema, Document, model } from 'mongoose';
import { LikeEntity } from '../../domain/entities/like';

const likeSchema = new Schema<LikeEntity>(

    {
        postId: {
            type: String,
            required: true,
        },
        autorUserId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export const LikeSchema = model<LikeEntity>('like', likeSchema);