import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, GuestGuard } from '../auth';
import { CreatePostComponent } from './page/create-post/create-post.component';
import { ListComponent } from './page/list/list.component';
import { PostComponent } from './page/post/post.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'posts',
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'create',
        canActivate: [AuthGuard],
        canDeactivate: [CreatePostComponent],
        component: CreatePostComponent,
      },
      {
        path: ':postId',
        component: PostComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
