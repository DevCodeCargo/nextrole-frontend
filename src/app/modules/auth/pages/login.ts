import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, LoginData, LoginRequest } from '../../../platform/services/auth.service';
import { CommonModule } from '@angular/common';
import { finalize, Observer } from 'rxjs';
import { ApiResponse } from '../../../platform/models/api/api.model';
import { StorageHelper } from '../../../platform/utils/storage-helper';

@Component({
  selector: 'nr-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html'
})
export class Login {

  model!: LoginRequest;

  private authService = inject(AuthService);

  errorMessage: string = "";
  isLoading = signal(false);

  constructor() {
    this.model = {
      username: "",
      password: ""
    }

    let email = StorageHelper.getSession('email');

    if (email) {
      this.model.username = email;
    }

  }

  onLoginSubmit(): void {
    this.errorMessage = '';
    this.isLoading.set(true);

    const observer: Partial<Observer<ApiResponse<LoginData>>> = {
      next: (res) => {
        console.log('Login success', res);
        // later: store token + navigate
      },
      error: (err) => {
        if (err.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      }
    };

    this.authService.login(this.model)
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe(observer);
  }

  // Input field label highlighter state tracking
  activeFocus = signal<string | null>(null);

  // Parallax dynamic vector tracking
  xAxis = signal<number>(0);
  yAxis = signal<number>(0);
  isHoveringPanel = signal<boolean>(false);

  setFocus(inputName: string) {
    this.activeFocus.set(inputName);
  }

  clearFocus() {
    this.activeFocus.set(null);
  }

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
    return `translate(${this.xAxis() * depth}px, ${this.yAxis() * depth}px)`;
  }

}
