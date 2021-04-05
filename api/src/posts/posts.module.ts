import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './services/posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostDefinition } from './schemas/post.schema';
import { CommentDefinition } from './schemas/comment.schema';
import { UsersModule } from '@app/users/users.module';
import { PostsResolver } from './resolvers/posts.resolver';
import { CommentsResolver } from './resolvers/comments.resolver';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([PostDefinition, CommentDefinition]),
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsResolver, CommentsResolver],
  exports: [],
})
export class PostsModule {}
