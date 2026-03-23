import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface RefreshResponse {
  access_token: string;
  token_type: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
      })
    );
  }

  register(data: RegisterRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/auth/register`, data);
  }

  refresh(): Observable<RefreshResponse> {
    const refresh_token = this.getRefreshToken();
    return this.http.post<RefreshResponse>(`${this.baseUrl}/auth/refresh`, { refresh_token }).pipe(
      tap(res => localStorage.setItem('access_token', res.access_token))
    );
  }

  logout(): Observable<{ message: string }> {
    const refresh_token = this.getRefreshToken();
    return this.http.post<{ message: string }>(`${this.baseUrl}/auth/logout`, { refresh_token }).pipe(
      tap(() => this.clearTokens())
    );
  }

  getServers(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(`${this.baseUrl}/servers`);
  }

  clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}
