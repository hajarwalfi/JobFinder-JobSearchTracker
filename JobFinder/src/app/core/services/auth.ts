import { Injectable } from '@angular/core';
import { Observable, from, throwError, forkJoin, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { db } from './firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
  getDoc,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersCollection = 'users';

  // Register a new user
  register(user: User): Observable<User> {
    const q = query(collection(db, this.usersCollection), where('email', '==', user.email));
    return from(getDocs(q)).pipe(
      switchMap((snapshot) => {
        if (!snapshot.empty) {
          return throwError(() => new Error('Cet email est déjà utilisé'));
        }
        return from(addDoc(collection(db, this.usersCollection), user)).pipe(
          map((docRef) => ({ ...user, id: docRef.id })),
        );
      }),
    );
  }

  // Login: check email + password against Firestore
  login(email: string, password: string): Observable<User> {
    const q = query(
      collection(db, this.usersCollection),
      where('email', '==', email),
      where('password', '==', password),
    );
    return from(getDocs(q)).pipe(
      map((snapshot) => {
        if (snapshot.empty) {
          throw new Error('Email ou mot de passe incorrect');
        }
        const docSnap = snapshot.docs[0];
        const user = { id: docSnap.id, ...docSnap.data() } as User;
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
    const docRef = doc(db, this.usersCollection, updatedUser.id!);
    return from(updateDoc(docRef, { ...updatedUser })).pipe(
      map(() => updatedUser),
      tap((user) => {
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      }),
    );
  }

  // Delete user account + associated data (favorites, applications)
  deleteAccount(userId: string): Observable<void> {
    const favsQuery = query(collection(db, 'favoritesOffers'), where('userId', '==', userId));
    const appsQuery = query(collection(db, 'applications'), where('userId', '==', userId));

    return forkJoin([from(getDocs(favsQuery)), from(getDocs(appsQuery))]).pipe(
      switchMap(([favsSnapshot, appsSnapshot]) => {
        const deletions: Observable<void>[] = [];

        // Delete all user's favorites
        favsSnapshot.docs.forEach((d) => {
          deletions.push(from(deleteDoc(doc(db, 'favoritesOffers', d.id))));
        });

        // Delete all user's applications
        appsSnapshot.docs.forEach((d) => {
          deletions.push(from(deleteDoc(doc(db, 'applications', d.id))));
        });

        // Delete the user account
        deletions.push(from(deleteDoc(doc(db, this.usersCollection, userId))));

        return deletions.length > 0 ? forkJoin(deletions) : of([]);
      }),
      tap(() => {
        localStorage.removeItem('currentUser');
      }),
      map(() => void 0),
    );
  }
}
