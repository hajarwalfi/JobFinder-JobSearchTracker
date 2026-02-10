import { Component, input, output } from '@angular/core';
import { JobOffer } from '../../../core/models/job-offer.model';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.html',
  host: { style: 'display: block' },
})
export class JobCard {
  job = input.required<JobOffer>();
  isFavorite = input<boolean>(false);
  isTracked = input<boolean>(false);
  isSelected = input<boolean>(false);

  addFavorite = output<JobOffer>();
  removeFavorite = output<JobOffer>();
  trackApplication = output<JobOffer>();
  selectJob = output<JobOffer>();

  constructor(public authService: AuthService) {}

  toggleFavorite() {
    if (this.isFavorite()) {
      this.removeFavorite.emit(this.job());
    } else {
      this.addFavorite.emit(this.job());
    }
  }

  onSelect() {
    this.selectJob.emit(this.job());
  }
}
