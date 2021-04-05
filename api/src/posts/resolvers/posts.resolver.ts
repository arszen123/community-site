import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { Post } from '../schemas/post.schema';
import { PostsService } from '../services/posts.service';

@Resolver('Post')
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query('post')
  async getPost(@Args('id') id: string) {
    return this.postsService.findById(id);
  }

  @Query('posts')
  async getPosts() {
    return this.postsService.findAll();
  }

  @ResolveField('comments')
  async getComments(@Parent() post: Post) {
    return post.comments;
  }

  @ResolveField('user')
  async getUser(@Parent() post: Post) {
    return post.user;
  }
}
