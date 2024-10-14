import { Routes } from '@angular/router';
import { RegisterEventComponent } from './components/register-event/register-event.component';
import { SearchEventsComponent } from './components/search-events/search-events.component';

export const routes: Routes = [
  { path: 'register', component: RegisterEventComponent },
  { path: 'search', component: SearchEventsComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' } 
];
