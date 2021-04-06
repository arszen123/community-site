import { UsersService } from '@app/users';
import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Comment } from '../schemas/comment.schema';

@Resolver('Comment')
export class CommentsResolver {
  constructor(private usersService: UsersService) {}
  @ResolveField('id')
  getId(@Parent() comment: Comment) {
    return (comment as any)._id;
  }
  @ResolveField('user')
  async getUser(@Parent() comment: Comment) {
    return this.usersService.findById((comment.user as unknown) as string);
  }
  @ResolveField('numberOfUpvotes')
  getNumOfUpvotes(@Parent() comment: Comment) {
    return comment.votes.reduce((a, c: any) => a + (c.isUpvote ? 1 : 0), 0);
  }
  @ResolveField('numberOfDownvotes')
  getNumOfDownvotes(@Parent() comment: Comment) {
    return comment.votes.reduce((a, c: any) => a + (c.isUpvote ? 0 : 1), 0);
  }
}
