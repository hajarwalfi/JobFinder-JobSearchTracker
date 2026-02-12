import { Component, input, output } from '@angular/core';
import { FavoriteOffer } from '../../../core/services/favorites';

@Component({
  selector: 'app-favorite-card',
  imports: [],
  templateUrl: './favorite-card.html',
})
export class FavoriteCard {
  favorite = input.required<FavoriteOffer>();
  remove = output<FavoriteOffer>();
}
