import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from '../schemas/comment.schema';
import { Post, PostDocument } from '../schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(createPostDto) {
    const post = new this.postModel(createPostDto);
    return post.save();
  }

  async addComment(postId, createCommentDto) {
    const comment = new this.commentModel(createCommentDto);
    return this.postModel
      .updateOne({ _id: postId }, { $push: { comments: comment } })
      .exec();
  }

  async findById(postId) {
    return this.postModel.findById(postId).populate(['user']).exec();
  }

  async findAll() {
    return this.postModel.find({}).populate(['user']).exec();
  }
}
