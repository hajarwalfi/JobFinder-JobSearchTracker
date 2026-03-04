import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { FavoriteOffer } from '../models/favorite-offer.model';
import { db } from './firebase';
import { collection, addDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private collectionName = 'favoritesOffers';

  getFavorites(userId: string): Observable<FavoriteOffer[]> {
    const q = query(collection(db, this.collectionName), where('userId', '==', userId));
    return from(getDocs(q)).pipe(
      map((snapshot) => snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as FavoriteOffer)),
    );
  }

  addFavorite(favorite: FavoriteOffer): Observable<FavoriteOffer> {
    const { id, ...data } = favorite;
    return from(addDoc(collection(db, this.collectionName), data)).pipe(
      map((docRef) => ({ ...favorite, id: docRef.id })),
    );
  }

  removeFavorite(id: string): Observable<void> {
    return from(deleteDoc(doc(db, this.collectionName, id)));
  }
}
