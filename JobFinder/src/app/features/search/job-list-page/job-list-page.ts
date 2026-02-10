import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { SearchBar } from '../search-bar/search-bar';
import { JobCard } from '../job-card/job-card';
import { JobOffersSection } from '../job-offers-section/job-offers-section';
import { JobOffer } from '../../../core/models/job-offer.model';
import { JobSearchService } from '../../../core/services/job-search';
import { AuthService } from '../../../core/services/auth';
import { ApplicationService } from '../../../core/services/application';
import { Store } from '@ngrx/store';
import { selectAllFavorites } from '../../../store/favorites/favorites.selectors';
import * as FavoritesActions from '../../../store/favorites/favorites.actions';

@Component({
  selector: 'app-job-list-page',
  imports: [SearchBar, JobCard, JobOffersSection, DatePipe],
  templateUrl: './job-list-page.html',
})
export class JobListPage implements OnInit, OnDestroy {
  jobs: JobOffer[] = [];
  totalResults = 0;
  currentPage = 1;
  resultsPerPage = 10;
  isLoading = false;
  errorMessage = '';
  hasSearched = false;
  selectedJob: JobOffer | null = null;
  private currentKeyword = '';
  private currentLocation = '';
  favoriteIds: Set<string> = new Set();
  trackedApplicationIds: Set<string> = new Set();
  private favoriteSub?: Subscription;

  constructor(
    private jobSearchService: JobSearchService,
    public authService: AuthService,
    private applicationService: ApplicationService,
    private store: Store,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadFavoriteIds();
    this.loadTrackedApplicationIds();
  }

  onSearch(event: { keyword: string; location: string }) {
    this.currentKeyword = event.keyword;
    this.currentLocation = event.location;
    this.currentPage = 1;
    this.loadJobs();
    this.loadFavoriteIds();
    this.loadTrackedApplicationIds();
  }

  loadJobs() {
    this.isLoading = true;
    this.errorMessage = '';
    this.hasSearched = true;

    this.jobSearchService
      .searchJobs(this.currentKeyword, this.currentLocation, this.currentPage, this.resultsPerPage)
      .subscribe({
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
    if (!user) return;
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
    if (!user) return;
    const favorite = {
      userId: user.id!,
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
    if (!user) return;
    this.store
      .select(selectAllFavorites)
      .subscribe((favs) => {
        const fav = favs.find((f) => f.offerId === job.id);
        if (fav?.id) {
          this.store.dispatch(FavoritesActions.removeFavorite({ id: fav.id }));
          this.favoriteIds.delete(job.id);
          this.cdr.detectChanges();
        }
      })
      .unsubscribe();
  }

  onTrackApplication(job: JobOffer) {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    if (this.trackedApplicationIds.has(job.id)) {
      alert('Cette offre est déjà dans votre suivi de candidatures.');
      return;
    }

    const application = {
      userId: user.id!,
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
        alert('Candidature ajoutée au suivi !');
        this.cdr.detectChanges();
      },
      error: () => {
        alert("Erreur lors de l'ajout de la candidature.");
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
  }
}
