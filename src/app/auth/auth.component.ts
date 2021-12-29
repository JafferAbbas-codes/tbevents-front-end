import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from './auth.service';
import { User } from '../interfaces';
import { Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../common/snackbar/snackbar.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loading = false;
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  @Input() showSignIn = true;
  hide = true;

  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: SnackbarComponent
  ) {}

  ngOnInit(): void {}

  // openSnackBar(message: string, action: string, options: Object) {
  //   this.snackBar.openSnackBar(message, action, options);
  // }

  setPage(showSiginIn: boolean) {
    this.showSignIn = showSiginIn;
  }
  onSubmitSignIn() {
    // TODO: Use EventEmitter with form value
    console.log('this.signInForm.valid', this.signInForm.valid);
    console.log('hide', this.hide);
    console.log('this.signInForm', this.signInForm);

    if (this.signInForm.valid) {
      this.loading = true;
      // ⚠️
      this.authService
        .loginUser(this.signInForm.value)
        .subscribe((response: any) => {
          console.log('here', response);
          let snackbarInput = {
            message: response.token
              ? '✔️ Authenticated,  Redirecting in a while...'
              : `${response.message? response.message : "Ops! Something went wrong."}`,
            action: 'OK',
            options: {
              // politeness: 'status',
              duration: 2000,
              panelClass: [
                response.token ?  'success-snackbar' : 'failure-snackbar' 
              ],
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            },
          };

          this.loading = false;
          this.snackBar.openSnackBar(snackbarInput);

          if (response.token) {
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 2000);
          }
        });
    }
  }
  onSubmitSignUp() {
    // TODO: Use EventEmitter with form value
    console.log('this.signUpForm.valid', this.signUpForm.valid);
    if (this.signUpForm.valid) {
      this.loading = true;
      this.authService
        .registerUser(this.signUpForm.value as User)
        .subscribe((response) => {
          console.log('here', response);
          let snackbarInput = {
            message: response.token
              ? '✔️ Account created,  Redirecting in a while...'
              : `⚠️ ${response.message? response.message : "Ops! Something went wrong."}`,
            action: 'OK',
            options: {
              // politeness: 'status',
              duration: 2000,
              panelClass: [
                response.error ? 'success-snackbar' : 'failure-snackbar' ,
              ],
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            },
          };

          this.loading = false;
          this.snackBar.openSnackBar(snackbarInput);

          if (response.token) {
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 2000);
          }
        });
    }
  }
}
