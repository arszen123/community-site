import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './modules/auth';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/post').then(m => m.PostRoutingModule),
  },
  {
    path: 'auth',
    canActivate: [GuestGuard],
    loadChildren: () => import('./modules/auth').then(m => m.AuthRoutingModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
