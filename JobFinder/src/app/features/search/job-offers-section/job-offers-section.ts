import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { JobOffer } from '../../../core/models/job-offer.model';
import { JobSearchService } from '../../../core/services/job-search';
import { AuthService } from '../../../core/services/auth';
import { ApplicationService } from '../../../core/services/application';
import { JobCard } from '../job-card/job-card';
import { selectAllFavorites } from '../../../store/favorites/favorites.selectors';
import * as FavoritesActions from '../../../store/favorites/favorites.actions';

@Component({
  selector: 'app-job-offers-section',
  imports: [JobCard, DatePipe],
  templateUrl: './job-offers-section.html',
})
export class JobOffersSection implements OnInit, OnDestroy {
  jobs: JobOffer[] = [];
  totalResults = 0;
  currentPage = 1;
  resultsPerPage = 6;
  isLoading = false;
  errorMessage = '';
  selectedJob: JobOffer | null = null;
  favoriteIds: Set<string> = new Set();
  trackedApplicationIds: Set<string> = new Set();
  private favoriteSub?: Subscription;

  constructor(
    private jobSearchService: JobSearchService,
    public authService: AuthService,
    private applicationService: ApplicationService,
    private store: Store,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadJobs();
    this.loadFavoriteIds();
    this.loadTrackedApplicationIds();
  }

  loadJobs() {
    this.isLoading = true;
    this.errorMessage = '';

    this.jobSearchService.searchJobs('', '', this.currentPage, this.resultsPerPage).subscribe({
      next: (result) => {
        this.jobs = result.jobs;
        this.totalResults = result.totalResults;
        this.selectedJob = result.jobs.length > 0 ? result.jobs[0] : null;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = `Erreur: ${err.message || err.statusText || 'Connexion échouée'}`;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  loadFavoriteIds() {
    const user = this.authService.getCurrentUser();
    if (!user?.id) return;
    this.store.dispatch(FavoritesActions.loadFavorites());
    this.favoriteSub?.unsubscribe();
    this.favoriteSub = this.store.select(selectAllFavorites).subscribe((favs) => {
      this.favoriteIds = new Set(favs.map((f) => f.offerId));
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.favoriteSub?.unsubscribe();
  }

  loadTrackedApplicationIds() {
    const user = this.authService.getCurrentUser();
    if (!user?.id) return;
    this.applicationService.getApplications(user.id).subscribe({
      next: (apps) => {
        this.trackedApplicationIds = new Set(apps.map((a) => a.offerId));
        this.cdr.detectChanges();
      },
    });
  }

  isFavorite(jobId: string): boolean {
    return this.favoriteIds.has(jobId);
  }

  isTracked(jobId: string): boolean {
    return this.trackedApplicationIds.has(jobId);
  }

  onAddFavorite(job: JobOffer) {
    const user = this.authService.getCurrentUser();
    if (!user?.id) return;
    const favorite = {
      userId: user.id,
      offerId: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      url: job.url,
    };
    this.store.dispatch(FavoritesActions.addFavorite({ favorite }));
    this.favoriteIds.add(job.id);
    this.cdr.detectChanges();
  }

  onRemoveFavorite(job: JobOffer) {
    const user = this.authService.getCurrentUser();
    if (!user?.id) return;
    this.store.select(selectAllFavorites).subscribe((favs) => {
      const fav = favs.find((f) => f.offerId === job.id);
      if (fav?.id) {
        this.store.dispatch(FavoritesActions.removeFavorite({ id: fav.id }));
        this.favoriteIds.delete(job.id);
        this.cdr.detectChanges();
      }
    }).unsubscribe();
  }

  onTrackApplication(job: JobOffer) {
    const user = this.authService.getCurrentUser();
    if (!user?.id) return;
    const application = {
      userId: user.id,
      offerId: job.id,
      apiSource: job.apiSource || '',
      title: job.title,
      company: job.company,
      location: job.location,
      url: job.url,
      status: 'en_attente' as const,
      notes: '',
      dateAdded: new Date().toISOString(),
    };
    this.applicationService.addApplication(application).subscribe({
      next: () => {
        this.trackedApplicationIds.add(job.id);
        this.cdr.detectChanges();
      },
      error: () => {
        this.cdr.detectChanges();
      },
    });
  }

  onSelectJob(job: JobOffer) {
    this.selectedJob = job;
  }

  toggleSelectedFavorite() {
    if (!this.selectedJob) return;
    if (this.isFavorite(this.selectedJob.id)) {
      this.onRemoveFavorite(this.selectedJob);
    } else {
      this.onAddFavorite(this.selectedJob);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalResults / this.resultsPerPage);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadJobs();
    window.scrollTo({
      top: document.getElementById('job-offers')?.offsetTop ?? 0,
      behavior: 'smooth',
    });
  }

  goToSearch() {
    this.router.navigate(['/search']);
  }
}
