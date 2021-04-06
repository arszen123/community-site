import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })
  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  authenticate() {
    if (this.form.valid) {
      this.authService.authenticate(this.form.value)
      .pipe(catchError(err => {
        if (err.status === 401) {
          this._message('Wrong username or password!');
        }
        return err;
      }))
      .subscribe(() => {
        this._message('Login success! Redirecting...')
        this.router.navigate(['/']);
      });
      return;
    }
    this._message('Invalid form!')
  }
  private _message(message) {
    return this._snackBar.open(message, 'Ok', {
      duration: 2500,
    })
  }
}
