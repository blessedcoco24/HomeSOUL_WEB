import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; //Import provideHttpClient
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideHttpClient(), provideRouter(routes, withComponentInputBinding())]
};
