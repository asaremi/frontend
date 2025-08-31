import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface LoginPayload { username: string; password: string; }
export interface LoginResponse { username: string; }

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<string> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/api/login`, payload)
      .pipe(map(res => res.username));
  }
}
