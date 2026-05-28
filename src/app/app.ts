import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DevErrorOverlayComponent } from './platform/utils/exception-handling/dev-error-overlay';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DevErrorOverlayComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('nextrole-frontend');
}
