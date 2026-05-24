import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, LoginData, LoginRequest } from '../../../platform/services/auth.service';
import { CommonModule } from '@angular/common';
import { finalize, Observer } from 'rxjs';
import { ApiResponse } from '../../../platform/models/api/api.model';

@Component({
  selector: 'nr-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html'
})
export class Register {

  // Input focus trackers
  activeFocus = signal<string | null>(null);

  // Parallax coordinates tracking
  xAxis = signal<number>(0);
  yAxis = signal<number>(0);
  isHoveringPanel = signal<boolean>(false);

  setFocus(inputName: string) {
    this.activeFocus.set(inputName);
  }

  clearFocus() {
    this.activeFocus.set(null);
  }

  onRegisterSubmit(event: Event) {
    event.preventDefault();
    // Insert signup authentication logic here
  }

  // Modern Parallax Event Processing
  onMouseMove(e: MouseEvent) {
    this.isHoveringPanel.set(true);
    this.xAxis.set((window.innerWidth / 2 - e.pageX) / 50);
    this.yAxis.set((window.innerHeight / 2 - e.pageY) / 50);
  }

  onMouseLeave() {
    this.isHoveringPanel.set(false);
    this.xAxis.set(0);
    this.yAxis.set(0);
  }

  getCardTransform(index: number): string {
    if (!this.isHoveringPanel()) {
      return 'translate(0px, 0px)';
    }
    const depth = index * 0.2;
    const xMove = this.xAxis() * depth;
    const yMove = this.yAxis() * depth;
    return `translate(${xMove}px, ${yMove}px)`;
  }

}
