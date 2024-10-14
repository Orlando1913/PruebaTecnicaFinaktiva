import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; 
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http'; 

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()) 
  ]
}).catch(err => console.error(err));
