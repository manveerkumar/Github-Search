import { Routes } from '@angular/router';
import { SearchComponent } from './features/search/search.component';
import { HistoryComponent } from './features/history/history.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';

export const routes: Routes = [
    { path: '', redirectTo: 'search',pathMatch: 'full' },
    { path: 'search', component: SearchComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'user/:username', component: UserProfileComponent },
    { path: '**', redirectTo: 'search' }  
];
