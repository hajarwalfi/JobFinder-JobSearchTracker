import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileEditForm } from '../profile-edit-form/profile-edit-form';
import { AuthService, User } from '../../../core/services/auth';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileEditForm],
  templateUrl: './profile-page.html',
})
export class ProfilePage {
  user: User | null;
  successMessage = '';
  errorMessage = '';
  showDeleteConfirm = false;
  activeTab: 'personal' | 'security' | 'danger' = 'personal';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.user = this.authService.getCurrentUser();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onUpdate(updatedUser: User) {
    this.successMessage = '';
    this.errorMessage = '';
    this.authService.updateUser(updatedUser).subscribe({
      next: () => {
        this.user = this.authService.getCurrentUser();
        this.successMessage = 'Profil mis à jour avec succès ✓';
        this.cdr.detectChanges();
        setTimeout(() => {
          this.successMessage = '';
          this.cdr.detectChanges();
        }, 4000);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la mise à jour du profil';
        this.cdr.detectChanges();
      },
    });
  }

  onDeleteAccount() {
    if (!this.user?.id) return;
    this.authService.deleteAccount(this.user.id).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la suppression du compte';
        this.cdr.detectChanges();
      },
    });
  }
}
