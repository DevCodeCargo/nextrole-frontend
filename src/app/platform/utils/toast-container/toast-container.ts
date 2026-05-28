import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { Toast } from '../../models/toast/toast.model';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.css'
})
export class ToastContainerComponent {
  // Inject the dynamic signal provider cleanly
  public toastService = inject(ToastService);

  // Track copy feedback state cleanly via Signals
  copiedToastId = signal<number | null>(null);

  copyToastContent(toast: Toast) {
    const formatText = toast.title
      ? `[${toast.title}] ${toast.message}`
      : toast.message;

    // Modern Native Clipboard API execution
    navigator.clipboard.writeText(formatText).then(() => {
      this.copiedToastId.set(toast.id);

      // Reset feedback back to copy icon after 2 seconds
      setTimeout(() => {
        if (this.copiedToastId() === toast.id) {
          this.copiedToastId.set(null);
        }
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy toast content: ', err);
    });
  }
}