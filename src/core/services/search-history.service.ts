import { Injectable, signal } from '@angular/core';
import { SearchHistory } from '../models/search-record.model';
import { GithubUser } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryService {
  private readonly STORAGE_KEY = 'github-search-history';
  private historySubject = new BehaviorSubject<SearchHistory[]>([]);
  
  public history$ = this.historySubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const storedHistory = localStorage.getItem(this.STORAGE_KEY);
    if (storedHistory) {
      this.historySubject.next(JSON.parse(storedHistory));
    }
  }

  private saveToStorage(history: SearchHistory[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
  }

  addToHistory(query: string, successful: boolean, result?: GithubUser): void {
    const currentHistory = this.historySubject.value;
    const newEntry: SearchHistory = {
      id: crypto.randomUUID(),
      query,
      timestamp: Date.now(),
      successful,
      result
    };
    
    const updatedHistory = [newEntry, ...currentHistory];
    this.historySubject.next(updatedHistory);
    this.saveToStorage(updatedHistory);
  }

  clearEntry(id: string): void {
    const currentHistory = this.historySubject.value;
    const updatedHistory = currentHistory.filter(item => item.id !== id);
    
    this.historySubject.next(updatedHistory);
    this.saveToStorage(updatedHistory);
  }

  clearAllHistory(): void {
    this.historySubject.next([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
