import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Application {
  id?: string;
  userId: string;
  offerId: string;
  apiSource?: string;
  title: string;
  company: string;
  location: string;
  url?: string;
  status: 'en_attente' | 'accepte' | 'refuse';
  notes: string;
  dateAdded: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private apiUrl = 'https://my-json-server.typicode.com/hajarwalfi/JobFinder-JobSearchTracker/applications';

  constructor(private http: HttpClient) {}

  getApplications(userId: string): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}?userId=${userId}`);
  }

  addApplication(application: Application): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, application);
  }

  updateApplication(id: string, updates: Partial<Application>): Observable<Application> {
    return this.http.patch<Application>(`${this.apiUrl}/${id}`, updates);
  }

  removeApplication(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
