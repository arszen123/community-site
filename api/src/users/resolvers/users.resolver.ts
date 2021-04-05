import { GqlUser } from '@app/auth';
import { GqlAuthGuard } from '@app/auth';
import { AuthUser } from '@app/auth';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';

@Resolver('User')
export class UsersResolver {
  @Query('me')
  @UseGuards(GqlAuthGuard)
  me(@GqlUser() user: AuthUser) {
    return { username: user.username, id: user.userId };
  }
}
