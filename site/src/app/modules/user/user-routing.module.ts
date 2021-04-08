import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth';
import { ProfileComponent } from './page/profile/profile.component';

const routes: Routes = [
  {
    path: 'me',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  {
    path: ':id',
    component: ProfileComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
