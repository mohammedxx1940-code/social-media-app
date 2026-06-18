import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} 
  from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { handleLoaderInterceptor } from './core/interceptors/handle-loader-interceptor';
import { handleErrorInterceptor } from './core/interceptors/handle-error-interceptor';
import { handleTokenInterceptor } from './core/interceptors/handle-token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes , 
      withInMemoryScrolling({
        scrollPositionRestoration : "enabled" ,
        anchorScrolling : "enabled"
      }) , 
      withHashLocation()
    ), 
    provideClientHydration(withEventReplay()) ,
    provideHttpClient(withFetch() , withInterceptors([handleLoaderInterceptor , handleErrorInterceptor ,
      handleTokenInterceptor
    ])) ,
    provideAnimations(),
    provideToastr() ,
  ]
};