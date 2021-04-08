import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from '../auth';
import { ProfileComponent } from './page/profile/profile.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { ListItemComponent, PostModule } from '../post';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    AuthModule,
    PostModule,
  ]
})
export class UserModule { }
