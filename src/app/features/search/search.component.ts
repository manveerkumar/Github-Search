import { Component } from '@angular/core';
import { GithubUser } from '../../../core/models/user.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, finalize, Subject } from 'rxjs';
import { GithubService } from '../../../core/services/github.service';
import { SearchHistoryService } from '../../../core/services/search-history.service';
import { Router } from '@angular/router';
import { UserCardComponent } from '../../shared/components/user-card/user-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [UserCardComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchControl = new FormControl('');
  user: GithubUser | null = null;
  isLoading = false;
  errorMessage = '';
  private searchTerms = new Subject<string>();

  constructor(
    private githubService: GithubService,
    private searchHistoryService: SearchHistoryService,
    private router: Router
  ) {
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchControl.valueChanges.pipe(
      filter(value => !!value),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      if (term && term.length > 2 && this.searchControl.value === term) {
        this.searchUser(term);
      }
    });
  }

  public onSearch(username: string): void {
    this.searchUser(username);
  }

  private searchUser(username: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.user = null;

    this.githubService.searchUser(username).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (result) => {
        if (result) {
          this.user = result;
          this.searchHistoryService.addToHistory(username, true, result);
        } else {
          this.errorMessage = `User '${username}' not found`;
          this.searchHistoryService.addToHistory(username, false);
        }
      },
      error: (error) => {
        this.errorMessage = `Error searching for user: ${error.message}`;
        this.searchHistoryService.addToHistory(username, false);
      }
    });
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.user = null;
    this.errorMessage = '';
  }

}
