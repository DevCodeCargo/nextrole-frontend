import { Injectable, signal } from '@angular/core';
import { DevError } from './dev-error.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorService {

  private currentError = signal<DevError | null>(null);

  show(error: DevError): void {

    // Prevent duplicate overlays
    if (this.currentError()) {
      return;
    }

    this.currentError.set(error);
  }

  clear(): void {
    this.currentError.set(null);
  }

  hasError(): boolean {
    return this.currentError() !== null;
  }

  error() {
    return this.currentError;
  }
}