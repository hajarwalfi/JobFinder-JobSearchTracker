import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FavoriteOffer {
  id?: string;
  userId: string;
  offerId: string;
  title: string;
  company: string;
  location: string;
  url?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private apiUrl = 'https://my-json-server.typicode.com/hajarwalfi/JobFinder-JobSearchTracker/favoritesOffers';

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
