import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FavoriteOffer } from '../models/favorite-offer.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private apiUrl = 'http://localhost:3000/favoritesOffers';

  constructor(private http: HttpClient) {}

  getFavorites(userId: string): Observable<FavoriteOffer[]> {
    return this.http.get<FavoriteOffer[]>(`${this.apiUrl}?userId=${userId}`);
  }

  addFavorite(favorite: FavoriteOffer): Observable<FavoriteOffer> {
    return this.http.post<FavoriteOffer>(this.apiUrl, favorite);
  }

  removeFavorite(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
