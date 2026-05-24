import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {
  // Signal tracking nav shadow state
  isScrolled = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  onSignUpSubmit(event: Event) {
    event.preventDefault();
    // Handle signup logic here
  }
}