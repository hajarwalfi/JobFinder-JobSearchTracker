import { Component, input, output, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-profile-edit-form',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-edit-form.html',
})
export class ProfileEditForm implements OnInit {
  user = input.required<User>();
  section = input<'personal' | 'security'>('personal');
  formSubmit = output<User>();

  profileForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const u = this.user();
    this.profileForm = this.fb.group({
      firstName: [u.firstName, [Validators.required, Validators.minLength(2)]],
      lastName: [u.lastName, [Validators.required, Validators.minLength(2)]],
      email: [u.email, [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formValue = this.profileForm.value;
      const updatedUser: User = {
        ...this.user(),
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
      };
      // Only include password if user typed a new one
      if (formValue.password) {
        updatedUser.password = formValue.password;
      }
      this.formSubmit.emit(updatedUser);
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}
