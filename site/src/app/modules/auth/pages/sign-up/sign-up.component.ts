import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent{
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })
  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  signUp() {
    if (this.form.valid) {
      const sub = this.authService.signUp(this.form.value)
      .pipe(catchError(err => {
        if (err.status === 409) {
          this._message('Username already taken. If it\'s yours, login.');
        }
        return err;
      })).subscribe(() => {
        sub.unsubscribe();
        this._message('Success! Redirecting...');
        this.router.navigate(['/']);
      });
      return;
    }
    this._message('Invalid form!');
  }

  private _message(message) {
    return this._snackBar.open(message, 'Ok', {
      duration: 2500,
    })
  }

}
