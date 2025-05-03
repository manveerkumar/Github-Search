import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { GithubUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  searchUser(username: string): Observable<GithubUser | null> {
    return this.http.get<GithubUser>(`${this.apiUrl}/users/${username}`)
      .pipe(
        catchError(() => of(null))
      );
  }

  getUserRepos(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/${username}/repos`)
      .pipe(
        catchError(() => of([]))
      );
  }
}
