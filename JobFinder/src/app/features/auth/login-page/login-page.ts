import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginForm } from '../login-form/login-form';
import { AuthHeader } from '../auth-header/auth-header';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login-page',
  imports: [LoginForm, AuthHeader, RouterLink],
  templateUrl: './login-page.html',
})
export class LoginPage {
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  onLogin(formData: { email: string; password: string }) {
    this.errorMessage = '';
    this.authService.login(formData.email, formData.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.cdr.detectChanges();
      },
    });
  }
}
