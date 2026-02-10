import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { JobOffer } from '../../../core/models/job-offer.model';
import { JobSearchService } from '../../../core/services/job-search';
import { AuthService } from '../../../core/services/auth';
import { FavoriteOffer } from '../../../core/models/favorite-offer.model';
import { FavoritesService } from '../../../core/services/favorites';
import { ApplicationService } from '../../../core/services/application';
import { JobCard } from '../job-card/job-card';

@Component({
  selector: 'app-job-offers-section',
  imports: [JobCard, DatePipe],
  templateUrl: './job-offers-section.html',
})
export class JobOffersSection implements OnInit {
  jobs: JobOffer[] = [];
  totalResults = 0;
  currentPage = 1;
  resultsPerPage = 6;
  isLoading = false;
  errorMessage = '';
  selectedJob: JobOffer | null = null;
  favoriteIds: Set<string> = new Set();
  trackedApplicationIds: Set<string> = new Set();

  constructor(
    private jobSearchService: JobSearchService,
    public authService: AuthService,
    private favoritesService: FavoritesService,
    private applicationService: ApplicationService,
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
    this.favoritesService.getFavorites(user.id).subscribe({
      next: (favs) => {
        this.favoriteIds = new Set(favs.map((f) => f.offerId));
        this.cdr.detectChanges();
      },
    });
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
    const favorite: FavoriteOffer = {
      userId: user.id,
      offerId: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      url: job.url,
    };
    this.favoritesService.addFavorite(favorite).subscribe({
      next: () => {
        this.favoriteIds.add(job.id);
        this.cdr.detectChanges();
      },
    });
  }

  onRemoveFavorite(job: JobOffer) {
    const user = this.authService.getCurrentUser();
    if (!user?.id) return;
    this.favoritesService.getFavorites(user.id).subscribe({
      next: (favs) => {
        const fav = favs.find((f) => f.offerId === job.id);
        if (fav?.id) {
          this.favoritesService.removeFavorite(fav.id).subscribe({
            next: () => {
              this.favoriteIds.delete(job.id);
              this.cdr.detectChanges();
            },
          });
        }
      },
    });
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
