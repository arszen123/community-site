import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { Comment, CommentDocument } from '../schemas/comment.schema';
import { Post, PostDocument } from '../schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const post = new this.postModel(createPostDto);
    return post.save();
  }

  async addComment(postId: string, createCommentDto: CreateCommentDto) {
    const comment = new this.commentModel(createCommentDto);
    return this.postModel
      .updateOne({ _id: postId }, { $push: { comments: comment } })
      .exec();
  }

  async findById(postId: string) {
    return this.postModel.findById(postId).populate(['user']).exec();
  }

  async findAll() {
    return this.postModel.find({}).populate(['user']).exec();
  }

  async voteComment(
    postId: string,
    commentId: string,
    userId: string,
    vote: boolean,
  ) {
    // base filter criteria (post, comment)
    const criteria = {
      _id: postId,
      'comments._id': new ObjectId(commentId),
    };
    // vote document
    const document = {
      user: new ObjectId(userId),
      isUpvote: vote,
    };
    // array filter, so we updet the correct comment
    const options = {
      arrayFilters: [{ 'comment._id': new ObjectId(commentId) }],
    };
    const res = await this.postModel.updateOne(
      { ...criteria, 'comments.votes.user': new ObjectId(userId) },
      {
        $set: {
          'comments.$[comment].votes.$': document,
        },
      },
      options,
    );
    // if no change is occured, insert a new vote.
    if (res.n === 0) {
      await this.postModel.updateOne(
        criteria,
        {
          $push: {
            'comments.$[comment].votes': document,
          },
        },
        options,
      );
    }
  }
}
