import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Application } from '../models/application.model';
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
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private collectionName = 'applications';

  getApplications(userId: string): Observable<Application[]> {
    const q = query(collection(db, this.collectionName), where('userId', '==', userId));
    return from(getDocs(q)).pipe(
      map((snapshot) => snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Application)),
    );
  }

  addApplication(application: Application): Observable<Application> {
    const { id, ...data } = application;
    return from(addDoc(collection(db, this.collectionName), data)).pipe(
      map((docRef) => ({ ...application, id: docRef.id })),
    );
  }

  updateApplication(id: string, updates: Partial<Application>): Observable<Application> {
    const docRef = doc(db, this.collectionName, id);
    return from(updateDoc(docRef, { ...updates })).pipe(
      map(() => ({ ...updates, id }) as Application),
    );
  }

  removeApplication(id: string): Observable<void> {
    return from(deleteDoc(doc(db, this.collectionName, id)));
  }
}
