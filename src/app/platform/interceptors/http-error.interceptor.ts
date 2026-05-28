import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const httpErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {

      let msg = error.error.message || error.message

      switch (error.status) {
        case 400:
          toastService.show(
            msg || 'Invalid request.',
            'error',
            'Bad Request'
          );
          break;

        case 401:
          authService.clearSession();

          toastService.show(
            'Your session has expired. Please login again.',
            'error',
            'Session Expired'
          );

          router.navigate(['/login']);
          break;

        case 403:
          toastService.show(
            'You do not have permission to perform this action.',
            'error',
            'Access Denied'
          );
          break;

        case 404:
          toastService.show(
            msg || 'Requested resource was not found.',
            'error',
            'Not Found'
          );
          break;

        case 406:
          toastService.show(
            msg || 'Operation could not be completed.',
            'warning',
            'Validation'
          );
          break;

        case 409:
          toastService.show(
            msg || 'Resource already exists.',
            'warning',
            'Conflict'
          );
          break;

        case 500:
          toastService.show(
            'Something went wrong. Please try again later.',
            'error',
            'Server Error'
          );
          break;

        default:
          toastService.show(
            msg || 'An unexpected error occurred.',
            'error',
            'Error'
          );
          break;
      }

      return throwError(() => error);
    }),
  );
};
