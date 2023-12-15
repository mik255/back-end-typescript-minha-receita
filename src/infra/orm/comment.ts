
import { Schema, model } from 'mongoose';
import { CommentEntity } from '../../domain/entities/commit';


const commentSchema = new Schema<CommentEntity>(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userImgUrl: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Adiciona automaticamente os campos `createdAt` e `updatedAt`
);

export const CommentSchema = model<CommentEntity>('Comment', commentSchema);
