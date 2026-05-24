import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, RegisterRequest } from '../../../platform/services/auth.service';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../../platform/models/api/api.model';
import { StorageHelper } from '../../../platform/utils/storage-helper';

@Component({
  selector: 'nr-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html'
})
export class Register {

  model!: RegisterRequest & {
    confirmPassword: string
  };

  isLoading: boolean = false;
  showConfirmPassword = false;

  private authService = inject(AuthService);

  constructor() {
    this.model = {
      confirmPassword: "",
      password: "",
      email: "",
      fullName: ""
    }

    let email = StorageHelper.getSession('email');

    if (email) {
      this.model.email = email;
    }
  }

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
    console.log(this.model);
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

  get passwordChecks() {
    const password = this.model.password ?? '';

    return {
      minLength: password.length >= 8,
      upperCase: /[A-Z]/.test(password),
      lowerCase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    };
  }

  get passwordsMatch(): boolean {
    return !!this.model.confirmPassword &&
      this.model.password === this.model.confirmPassword;
  }

  get passwordValid(): boolean {
    const checks = this.passwordChecks;

    return checks.minLength &&
      checks.upperCase &&
      checks.lowerCase &&
      checks.number &&
      checks.special;
  }

  get canRegister(): boolean {

    return !!this.model.fullName?.trim()
      && this.passwordValid
      && this.passwordsMatch;

  }

}
