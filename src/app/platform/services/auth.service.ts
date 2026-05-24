import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api/api.model';

export interface LoginRequest {
  tenantCode?: string;
  username: string;
  password: string;
}

export interface LoginData {
  accessToken: string;
  tenant: string;
  user: AuthenticatedUser;
}

export interface AuthenticatedUser {
  user_id: number;
  username: string;
  tenant: string;
  tenantName?: string;
}

export interface AuthSession {
  accessToken: string;
  tenant: string;
  user: AuthenticatedUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly sessionKey = 'codecargo.auth.session';

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  login(payload: LoginRequest): Observable<ApiResponse<LoginData>> {
    return this.http.post<ApiResponse<LoginData>>(`${this.apiUrl}/auth/login`, payload).pipe(
      tap((response) => {
        if (response.success && response.data?.accessToken) {
          this.saveSession(response.data);
        }
      }),
    );
  }

  saveSession(data: LoginData): void {
    const session: AuthSession = {
      accessToken: data.accessToken,
      tenant: data.tenant,
      user: data.user,
    };

    localStorage.setItem(this.sessionKey, JSON.stringify(session));
  }

  getSession(): AuthSession | null {
    const rawSession = localStorage.getItem(this.sessionKey);

    if (!rawSession) {
      return null;
    }

    try {
      return JSON.parse(rawSession) as AuthSession;
    } catch {
      this.clearSession();
      return null;
    }
  }

  getAccessToken(): string | null {
    return this.getSession()?.accessToken ?? null;
  }

  isAuthenticated(): boolean {
    return Boolean(this.getAccessToken());
  }

  clearSession(): void {
    localStorage.removeItem(this.sessionKey);
  }
}
