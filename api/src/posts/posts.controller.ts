import { JwtAuthGuard } from '@app/auth';
import { AuthUser } from '@app/auth';
import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './services/posts.service';

type ObjectWithUser<T> = T & { user: string };

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() createPostDto: CreatePostDto) {
    (createPostDto as ObjectWithUser<CreatePostDto>).user = req.user.userId;
    await this.postsService.create(createPostDto);
    return {
      success: true,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  async addComment(
    @Req() { user }: { user: AuthUser },
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    (createCommentDto as ObjectWithUser<CreateCommentDto>).user = user.userId;
    await this.postsService.addComment(id, createCommentDto);
    return {
      success: true,
    };
  }
}
