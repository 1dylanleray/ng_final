import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  authForm: FormGroup;
  isLoginMode: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: [''],
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    if (this.isLoginMode) {
      this.authForm.get('name')?.clearValidators();
    } else {
      this.authForm.get('name')?.setValidators([Validators.required]);
    }
    this.authForm.get('name')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    const { email, password, name } = this.authForm.value;

    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe(
        (res) => {
          alert('Login successful!');
          this.router.navigate(['/hotels']);
        },
        (err) => alert('Login failed: ' + err.message)
      );
    } else {
      this.authService.signup(email, password, name).subscribe(
        (res) => {
          alert('Signup successful!');
          this.toggleMode();
        },
        (err) => alert('Signup failed: ' + err.message)
      );
    }
  }
}
