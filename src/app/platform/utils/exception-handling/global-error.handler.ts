import {
  ErrorHandler,
  Injectable,
  inject
} from '@angular/core';

import { Router } from '@angular/router';


import { GlobalErrorService } from './global-error.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  private readonly globalErrorService = inject(GlobalErrorService);
  private readonly router = inject(Router);

  handleError(error: any): void {

    console.error('Global Frontend Error:', error);

    // Production
    if (environment.production) {
      return;
    }

    const devError = {
      message:
        error?.message ||
        'Unknown frontend exception occurred.',

      stack:
        error?.stack || '',

      route:
        this.router.url,

      timestamp:
        new Date(),

      browser:
        navigator.userAgent
    };

    this.globalErrorService.show(devError);
  }
}