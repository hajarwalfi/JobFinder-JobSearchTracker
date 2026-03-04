import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, tap, throwError, forkJoin, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Register a new user
  register(user: User): Observable<User> {
    // First check if email already exists
    return this.http.get<User[]>(`${this.apiUrl}?email=${user.email}`).pipe(
      switchMap((existingUsers) => {
        if (existingUsers.length > 0) {
          return throwError(() => new Error('Cet email est déjà utilisé'));
        }
        return this.http.post<User>(this.apiUrl, user);
      }),
    );
  }

  // Login: check email + password against JSON Server
  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map((users) => {
        if (users.length === 0) {
          throw new Error('Email ou mot de passe incorrect');
        }
        const user = users[0];
        // Store user without password in localStorage
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        return userWithoutPassword as User;
      }),
    );
  }

  // Logout: remove user from localStorage
  logout(): void {
    localStorage.removeItem('currentUser');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  // Get current logged-in user
  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  // Update user profile
  updateUser(updatedUser: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${updatedUser.id}`, updatedUser).pipe(
      tap((user) => {
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      }),
    );
  }

  // Delete user account + associated data (favorites, applications)
  deleteAccount(userId: string): Observable<void> {
    return forkJoin([
      this.http.get<any[]>(`http://localhost:3000/favoritesOffers?userId=${userId}`),
      this.http.get<any[]>(`http://localhost:3000/applications?userId=${userId}`),
    ]).pipe(
      switchMap(([favorites, applications]) => {
        const deletions: Observable<void>[] = [];

        // Delete all user's favorites
        favorites.forEach((fav) => {
          deletions.push(this.http.delete<void>(`http://localhost:3000/favoritesOffers/${fav.id}`));
        });

        // Delete all user's applications
        applications.forEach((app) => {
          deletions.push(this.http.delete<void>(`http://localhost:3000/applications/${app.id}`));
        });

        // Delete the user account
        deletions.push(this.http.delete<void>(`${this.apiUrl}/${userId}`));

        return deletions.length > 0 ? forkJoin(deletions) : of([]);
      }),
      tap(() => {
        localStorage.removeItem('currentUser');
      }),
      map(() => void 0),
    );
  }
}
