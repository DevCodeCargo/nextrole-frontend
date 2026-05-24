import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, LoginData, LoginRequest } from '../../../platform/services/auth.service';
import { CommonModule } from '@angular/common';
import { finalize, Observer } from 'rxjs';
import { ApiResponse } from '../../../platform/models/api/api.model';

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
  }

  onSubmit(): void {
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

}
