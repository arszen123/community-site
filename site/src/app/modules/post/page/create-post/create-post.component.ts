import { Component, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanDeactivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements CanDeactivate<CreatePostComponent> {

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(10)]),
    description: new FormControl('', [Validators.required]),
  });
  private static isValueChanged = false;

  constructor(
    private postService: PostService,
    private _snackBar: MatSnackBar,
  ) {
    CreatePostComponent.isValueChanged = false;
    this.form.valueChanges.subscribe(() => {
      CreatePostComponent.isValueChanged = true;
    });
  }


  save() {
    if (this.form.valid) {
      this.postService.create(this.form.value)
        .subscribe(() => {
          this._message('Post saved!');
          CreatePostComponent.isValueChanged = false;
        })
    }
  }

  private _message(message: string) {
    this._snackBar.open(message, 'Ok', {
      duration: 2500,
    })
  }

  canDeactivate(): boolean {
    return !CreatePostComponent.isValueChanged || confirm('There are unsaved changes. Leave?');
  }

}
