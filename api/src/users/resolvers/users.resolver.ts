import { GqlUser } from '@app/auth';
import { GqlAuthGuard } from '@app/auth';
import { AuthUser } from '@app/auth';
import { Comment } from '@app/posts';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query('me')
  @UseGuards(GqlAuthGuard)
  me(@GqlUser() user: AuthUser) {
    return { username: user.username, id: user.userId };
  }

  @Query('user')
  findUserById(@Args('id') id: string) {
    return this.usersService.findById(id);
  }
}

@Resolver('Comment')
export class CommentUserResolver {
  constructor(private usersService: UsersService) {}
  @ResolveField('user')
  async getUser(@Parent() comment: Comment) {
    return this.usersService.findById((comment.user as unknown) as string);
  }
}
