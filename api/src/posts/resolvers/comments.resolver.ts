import { UsersService } from '@app/users';
import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Comment } from '../schemas/comment.schema';

@Resolver('Comment')
export class CommentsResolver {
  constructor(private usersService: UsersService) {}
  @ResolveField('user')
  async getUser(@Parent() comment: Comment) {
    return this.usersService.findById((comment.user as unknown) as string);
  }
}
