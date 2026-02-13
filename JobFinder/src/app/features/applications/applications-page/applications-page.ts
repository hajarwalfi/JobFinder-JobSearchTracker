import { Component, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, tap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApplicationCard } from '../application-card/application-card';
import { ApplicationsStats } from '../applications-stats/applications-stats';
import { Application, ApplicationService } from '../../../core/services/application';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-applications-page',
  imports: [ApplicationCard, ApplicationsStats, AsyncPipe],
  templateUrl: './applications-page.html',
})
export class ApplicationsPage implements OnInit, OnDestroy {
  applications$!: Observable<Application[]>;
  paginatedApplications$!: Observable<Application[]>;
  totalApplications = 0;
  loading = true;
  error = '';

  currentPage = 1;
  itemsPerPage = 6;

  private refresh$ = new BehaviorSubject<void>(undefined);

  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (!user?.id) return;

    this.applications$ = this.refresh$.pipe(
      switchMap(() => {
        this.loading = true;
        this.error = '';
        return this.applicationService.getApplications(user.id!).pipe(
          tap((apps) => {
            this.loading = false;
            this.totalApplications = apps.length;
            if (this.currentPage > this.totalPages && this.totalPages > 0) {
              this.currentPage = this.totalPages;
            }
          }),
          catchError((err) => {
            this.loading = false;
            this.error = err.message;
            return of([] as Application[]);
          }),
        );
      }),
    );

    this.paginatedApplications$ = this.applications$.pipe(
      map((apps) => {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return apps.slice(start, start + this.itemsPerPage);
      }),
    );
  }

  ngOnDestroy() {
    this.refresh$.complete();
  }

  get totalPages(): number {
    return Math.ceil(this.totalApplications / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginatedApplications$ = this.applications$.pipe(
      map((apps) => {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return apps.slice(start, start + this.itemsPerPage);
      }),
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onStatusChange(event: { id: string; status: Application['status'] }) {
    this.applicationService.updateApplication(event.id, { status: event.status }).subscribe(() => {
      this.refresh$.next();
    });
  }

  onNotesChange(event: { id: string; notes: string }) {
    this.applicationService.updateApplication(event.id, { notes: event.notes }).subscribe(() => {
      this.refresh$.next();
    });
  }

  onRemove(id: string) {
    this.applicationService.removeApplication(id).subscribe(() => {
      this.refresh$.next();
    });
  }
}
