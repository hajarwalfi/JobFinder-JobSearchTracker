import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FavoriteCard } from '../favorite-card/favorite-card';
import { FavoritesStats } from '../favorites-stats/favorites-stats';
import { FavoriteOffer } from '../../../core/models/favorite-offer.model';
import {
  selectAllFavorites,
  selectFavoritesLoading,
} from '../../../store/favorites/favorites.selectors';
import * as FavoritesActions from '../../../store/favorites/favorites.actions';

@Component({
  selector: 'app-favorites-page',
  imports: [FavoriteCard, FavoritesStats, AsyncPipe],
  templateUrl: './favorites-page.html',
})
export class FavoritesPage implements OnInit {
  favorites$: Observable<FavoriteOffer[]>;
  paginatedFavorites$: Observable<FavoriteOffer[]>;
  totalFavorites$: Observable<number>;
  loading$: Observable<boolean>;

  currentPage = 1;
  itemsPerPage = 6;

  constructor(private store: Store) {
    this.favorites$ = this.store.select(selectAllFavorites);
    this.loading$ = this.store.select(selectFavoritesLoading);
    this.totalFavorites$ = this.favorites$.pipe(map((favs) => favs.length));
    this.paginatedFavorites$ = this.favorites$.pipe(
      map((favs) => {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return favs.slice(start, start + this.itemsPerPage);
      }),
    );
  }

  ngOnInit() {
    this.store.dispatch(FavoritesActions.loadFavorites());
  }

  get totalPages(): number {
    let total = 0;
    this.totalFavorites$.subscribe((n) => (total = n)).unsubscribe();
    return Math.ceil(total / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginatedFavorites$ = this.favorites$.pipe(
      map((favs) => {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return favs.slice(start, start + this.itemsPerPage);
      }),
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onRemove(favorite: FavoriteOffer) {
    if (favorite.id) {
      this.store.dispatch(FavoritesActions.removeFavorite({ id: favorite.id }));
    }
  }
}
