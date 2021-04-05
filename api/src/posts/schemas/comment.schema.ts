import { User } from '@app/users';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ _id: false })
export class Comment {
  @Prop({ type: String, required: true })
  text: string;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;
  @Prop({ type: Date, required: true, default: new Date() })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
export const CommentDefinition: ModelDefinition = {
  name: Comment.name,
  schema: CommentSchema,
};
