import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SignupForm } from '../signup-form/signup-form';
import { AuthHeader } from '../auth-header/auth-header';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-signup-page',
  imports: [SignupForm, AuthHeader, RouterLink],
  templateUrl: './signup-page.html',
})
export class SignupPage {
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSignup(formData: { firstName: string; lastName: string; email: string; password: string }) {
    this.errorMessage = '';
    this.authService.register(formData).subscribe({
      next: () => {
        // After successful registration, log the user in automatically
        this.authService.login(formData.email, formData.password).subscribe({
          next: () => {
            this.router.navigate(['/search']);
          },
          error: (err) => {
            // If auto-login fails, still navigate to search but show a warning
            this.errorMessage = 'Inscription réussie. Connexion automatique échouée.';
            this.router.navigate(['/search']);
          },
        });
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
    });
  }
}
