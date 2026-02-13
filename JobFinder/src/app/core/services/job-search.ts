import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, timeout, catchError, throwError } from 'rxjs';

export interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  salary: string;
  datePosted: string;
  apiSource?: string;
}

interface AdzunaResponse {
  results: AdzunaJob[];
  count: number;
}

interface AdzunaJob {
  id: string;
  title: string;
  company: { display_name: string };
  location: { display_name: string };
  description: string;
  redirect_url: string;
  salary_min?: number;
  salary_max?: number;
  created: string;
}

@Injectable({
  providedIn: 'root',
})
export class JobSearchService {
  private appId = '394660a0';
  private appKey = '9714564bf03dd60c2dfa3dd83a41e703';
  private baseUrl = 'https://api.adzuna.com/v1/api/jobs';
  private country = 'fr'; // gb = UK, fr = France, us = USA, etc.

  constructor(private http: HttpClient) {}

  searchJobs(
    keyword: string,
    location: string,
    page: number = 1,
    resultsPerPage: number = 10,
  ): Observable<{ jobs: JobOffer[]; totalResults: number }> {
    const params: any = {
      app_id: this.appId,
      app_key: this.appKey,
      results_per_page: resultsPerPage,
      sort_by: 'date',
      'content-type': 'application/json',
    };

    if (keyword && keyword.trim()) {
      params.what = keyword.trim();
      params.title_only = 1;
    }

    if (location && location.trim()) {
      params.where = location.trim();
    }

    return this.http
      .get<AdzunaResponse>(`${this.baseUrl}/${this.country}/search/${page}`, { params })
      .pipe(
        timeout(15000),
        map((response) => {
          // Filtre côté front : ne garder que les jobs dont le titre contient le mot-clé
          let jobs = response.results.map((job) => this.mapAdzunaJob(job));
          if (keyword && keyword.trim()) {
            const lowerKeyword = keyword.trim().toLowerCase();
            jobs = jobs.filter((job) => job.title.toLowerCase().includes(lowerKeyword));
          }
          // Filtre par localisation : ne garder que les jobs dont la ville contient le mot recherché
          if (location && location.trim()) {
            const lowerLocation = location.trim().toLowerCase();
            jobs = jobs.filter((job) => job.location.toLowerCase().includes(lowerLocation));
          }
          return {
            jobs,
            totalResults: response.count,
          };
        }),
        catchError((err) => {
          return throwError(() => err);
        }),
      );
  }

  private mapAdzunaJob(job: AdzunaJob): JobOffer {
    let salary = '';
    if (job.salary_min && job.salary_max) {
      salary = `${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()} £`;
    } else if (job.salary_min) {
      salary = `${job.salary_min.toLocaleString()} £+`;
    }

    return {
      id: job.id,
      title: job.title,
      company: job.company?.display_name || 'Non spécifié',
      location: job.location?.display_name || 'Non spécifié',
      description: job.description,
      url: job.redirect_url,
      salary: salary || 'Non spécifié',
      datePosted: job.created,
      apiSource: 'adzuna',
    };
  }
}
