import { Component } from '@angular/core';
import { GithubUser } from '../../../core/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../../../core/services/github.service';
import { catchError, of, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  username = '';
  user: GithubUser | null = null;
  repositories: any[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      tap(() => {
        this.isLoading = true;
        this.errorMessage = '';
      }),
      switchMap(params => {
        this.username = params.get('username') || '';
        if (!this.username) {
          this.errorMessage = 'Username not provided';
          this.isLoading = false;
          return of(null);
        }
        return this.githubService.searchUser(this.username);
      }),
      catchError(error => {
        this.errorMessage = `Error loading user profile: ${error.message}`;
        this.isLoading = false;
        return of(null);
      })
    ).subscribe(user => {
      if (user) {
        this.user = user;
        this.loadRepositories();
      } else if (!this.errorMessage) {
        this.errorMessage = `User '${this.username}' not found`;
      }
      this.isLoading = false;
    });
  }

  loadRepositories(): void {
    if (!this.username) return;
    
    this.githubService.getUserRepos(this.username).subscribe({
      next: (repos) => {
        this.repositories = repos.sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      },
      error: () => {
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getLanguageColor(language: string): string {
    const colors: Record<string, string> = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#2b7489',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
      'Python': '#3572A5',
      'Java': '#b07219',
      'C#': '#178600',
      'PHP': '#4F5D95',
      'Ruby': '#701516',
      'Go': '#00ADD8',
      'Swift': '#ffac45',
      'Kotlin': '#F18E33',
      'Rust': '#dea584',
      'Dart': '#00B4AB'
    };
    
    return colors[language] || '#8257e5';
  }

}
