import { User } from '@app/users';
import {
  ModelDefinition,
  Prop,
  raw,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ type: String, required: true })
  text: string;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;
  @Prop({ type: Date, required: true, default: new Date() })
  createdAt: Date;
  @Prop(
    raw([
      {
        user: { type: MongooseSchema.Types.ObjectId, ref: 'User' },
        isUpvote: { type: Boolean },
      },
    ]),
  )
  votes: User[];
  get id() {
    return (this as any)._id;
  }
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
export const CommentDefinition: ModelDefinition = {
  name: Comment.name,
  schema: CommentSchema,
};
