import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from '../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post$: Observable<Post>;
  private postId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    ) { }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({postId}) => {
      this.post$ = this.postService.findById(postId);
      this.postId = postId;
    });
  }

  addComment(text: string) {
    if (text.length < 20) {
      this._message('Comment should be at least 20 character long!');
      return;
    }
    this.postService.addComment(this.postId, text).subscribe(() => {
      this._message('Comment added');
    })
  }

  vote({commentId, isUpvote}) {
    this.postService.voteComment(this.postId, commentId, isUpvote).subscribe(() => {
      this._message('Comment voted!');
    })
  }

  private _message(message: string) {
    this._snackBar.open(message, 'Ok', {
      duration: 2500,
    })
  }

}
