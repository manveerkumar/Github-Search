import { Component } from '@angular/core';
import { SearchHistory } from '../../../core/models/search-record.model';
import { SearchHistoryService } from '../../../core/services/search-history.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-history',
  imports: [CommonModule,RouterModule,TimeAgoPipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  searchHistory: SearchHistory[] = [];
  paginatedHistory: SearchHistory[] = [];

  currentPage = 1;
  itemsPerPage = 5;

  pagesPerChunk = 10;

  constructor(private searchHistoryService: SearchHistoryService) {}

  ngOnInit(): void {
    this.searchHistoryService.history$.subscribe(history => {
      this.searchHistory = history;
      this.setPaginatedHistory();
    });
  }

  setPaginatedHistory(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedHistory = this.searchHistory.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.setPaginatedHistory();
  }

  get totalPages(): number {
    return Math.ceil(this.searchHistory.length / this.itemsPerPage);
  }

  get currentChunkStart(): number {
    return Math.floor((this.currentPage - 1) / this.pagesPerChunk) * this.pagesPerChunk + 1;
  }

  get currentChunkPages(): number[] {
    const start = this.currentChunkStart;
    const end = Math.min(start + this.pagesPerChunk - 1, this.totalPages);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  goToPrevChunk(): void {
    const prevChunkPage = this.currentChunkStart - this.pagesPerChunk;
    if (prevChunkPage >= 1) {
      this.goToPage(prevChunkPage);
    }
  }

  goToNextChunk(): void {
    const nextChunkPage = this.currentChunkStart + this.pagesPerChunk;
    if (nextChunkPage <= this.totalPages) {
      this.goToPage(nextChunkPage);
    }
  }

  clearHistoryItem(id: string): void {
    this.searchHistoryService.clearEntry(id);
  }

  clearAllHistory(): void {
    if (confirm('Are you sure you want to clear all search history?')) {
      this.searchHistoryService.clearAllHistory();
    }
  }
}


