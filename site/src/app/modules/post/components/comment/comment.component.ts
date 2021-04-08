import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../../interfaces/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input()
  comment: Comment;
  @Output()
  vote = new EventEmitter<{commentId: string, isUpvote: boolean}>();

  triggerVote(isUpvote) {
    this.vote.emit({commentId: this.comment.id, isUpvote});
  }
}
