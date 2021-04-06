import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post, PostService } from '../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post$: Observable<Post>;

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
    });
  }

  addComment(text: string) {
    if (text.length < 20) {
      this._message('Comment should be at least 20 character long!');
      return;
    }
    this.post$.subscribe(({id}) => {
      this.postService.addComment(id, text).subscribe(() => {
        this._message('Comment added');
      })
    })
  }

  vote({commentId, isUpvote}) {
    this.post$.subscribe(({id}) => {
      this.postService.voteComment(id, commentId, isUpvote).subscribe(() => {
        this._message('Comment voted!');
      })
    })
  }

  private _message(message: string) {
    this._snackBar.open(message, 'Ok', {
      duration: 2500,
    })
  }

}
