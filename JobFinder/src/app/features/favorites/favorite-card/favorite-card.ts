import { Component, input, output } from '@angular/core';
import { FavoriteOffer } from '../../../core/models/favorite-offer.model';

@Component({
  selector: 'app-favorite-card',
  imports: [],
  templateUrl: './favorite-card.html',
})
export class FavoriteCard {
  favorite = input.required<FavoriteOffer>();
  remove = output<FavoriteOffer>();
}
