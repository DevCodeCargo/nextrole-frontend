import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './platform/interceptors/auth.interceptor';
import { httpErrorInterceptor } from './platform/interceptors/http-error.interceptor';
import { GlobalErrorHandler } from './platform/utils/exception-handling/global-error.handler';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, httpErrorInterceptor])
    ),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ]
};
