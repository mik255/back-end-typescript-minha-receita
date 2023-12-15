import { Schema, model } from 'mongoose';
import { UserEntity } from '../../domain/entities/user';

const userSchema = new Schema<UserEntity>({
  nome: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserSchema = model<UserEntity>('User', userSchema);
