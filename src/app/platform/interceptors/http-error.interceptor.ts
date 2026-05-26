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

      switch (error.status) {
        case 400:
          toastService.show(
            error.message || 'Invalid request.',
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
            error.message || 'Requested resource was not found.',
            'error',
            'Not Found'
          );
          break;

        case 406:
          toastService.show(
            error.message || 'Operation could not be completed.',
            'warning',
            'Validation'
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
            error.message || 'An unexpected error occurred.',
            'error',
            'Error'
          );
          break;
      }

      return throwError(() => error);
    }),
  );
};
