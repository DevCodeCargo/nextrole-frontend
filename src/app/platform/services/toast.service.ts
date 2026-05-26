import { Injectable, signal } from '@angular/core';
import { Toast, ToastType } from '../models/toast/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // Modern signal replacing BehaviorSubject<Toast[]>
  toasts = signal<Toast[]>([]);
  private nextId = 0;

  show(message: string, type: ToastType = 'info', title?: string, duration = 5000) {
    const id = this.nextId++;
    const newToast: Toast = { id, type, title, message, duration };

    // Prepend to make newest toasts appear at the top of the stack
    this.toasts.update((currentToasts) => [newToast, ...currentToasts]);

    // Automatically dismiss success, warning, and info alerts
    if (type === 'error') {
      duration = 15000;
    }

    setTimeout(() => this.dismiss(id), duration);
  }

  dismiss(id: number) {
    this.toasts.update((currentToasts) => currentToasts.filter(t => t.id !== id));
  }
}