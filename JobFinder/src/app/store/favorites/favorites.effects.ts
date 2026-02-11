import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { FavoritesService } from '../../core/services/favorites';
import { AuthService } from '../../core/services/auth';
import * as FavoritesActions from './favorites.actions';

@Injectable()
export class FavoritesEffects {
  private actions$ = inject(Actions);
  private favoritesService = inject(FavoritesService);
  private authService = inject(AuthService);

  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.loadFavorites),
      switchMap(() => {
        const user = this.authService.getCurrentUser();
        if (!user?.id) return of(FavoritesActions.loadFavoritesFailure({ error: 'Non connecté' }));

        return this.favoritesService.getFavorites(user.id).pipe(
          map(favorites => FavoritesActions.loadFavoritesSuccess({ favorites })),
          catchError(error => of(FavoritesActions.loadFavoritesFailure({ error: error.message })))
        );
      })
    )
  );

  addFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.addFavorite),
      switchMap(({ favorite }) =>
        this.favoritesService.addFavorite(favorite).pipe(
          map(saved => FavoritesActions.addFavoriteSuccess({ favorite: saved })),
          catchError(error => of(FavoritesActions.addFavoriteFailure({ error: error.message })))
        )
      )
    )
  );

  removeFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.removeFavorite),
      switchMap(({ id }) =>
        this.favoritesService.removeFavorite(id).pipe(
          map(() => FavoritesActions.removeFavoriteSuccess({ id })),
          catchError(error => of(FavoritesActions.removeFavoriteFailure({ error: error.message })))
        )
      )
    )
  );
}
