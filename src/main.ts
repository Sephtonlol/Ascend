import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideRouter(routes, withViewTransitions()),
  ],
});
