import { User } from '@app/users';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Comment } from './comment.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: String, required: true })
  description: string;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;
  @Prop({ type: Date, required: true, default: new Date() })
  createdAt: Date;
  @Prop({ type: MongooseSchema.Types.Array, ref: 'Comment', default: [] })
  comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
export const PostDefinition: ModelDefinition = {
  name: Post.name,
  schema: PostSchema,
};
