import {
  Component,
  computed,
  inject,
  signal,
  Signal
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { GlobalErrorService } from './global-error.service';

@Component({
  selector: 'nr-dev-error-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dev-error-overlay.html'
})
export class DevErrorOverlayComponent {

  private readonly globalErrorService =
    inject(GlobalErrorService);

  readonly copied = signal(false);

  readonly error =
    computed(() => this.globalErrorService.error()());

  dismiss(): void {
    this.globalErrorService.clear();
  }

  reload(): void {
    window.location.reload();
  }

  copy(): void {

    this.copied.set(true);

    const err = this.error();

    if (!err) {
      return;
    }

    const text = `
Message:
${err.message}

Route:
${err.route}

Timestamp:
${err.timestamp}

Stack:
${err.stack}
`;

    navigator.clipboard.writeText(text);

    setTimeout(() => {
      this.copied.set(false);
    }, 1000);

  }
}