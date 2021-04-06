import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './page/post/post.component';
import { ListComponent } from './page/list/list.component';
import { CreatePostComponent } from './page/create-post/create-post.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { CommentComponent } from './components/comment/comment.component';



@NgModule({
  declarations: [
    PostComponent,
    ListComponent,
    CreatePostComponent,
    CreateCommentComponent,
    CommentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PostModule { }
