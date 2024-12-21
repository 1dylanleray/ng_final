import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    this.isAuthenticated()
  );

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string, name: string): Observable<any> {
    const newUser = { email, password, name };
    return this.http.post(`${this.baseUrl}/users`, newUser);
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .get<any[]>(`${this.baseUrl}/users?email=${email}&password=${password}`)
      .pipe(
        tap((users) => {
          if (users.length > 0) {
            const user = users[0];
            // Store user and token in localStorage
            localStorage.setItem('token', 'dummy-token');
            localStorage.setItem('user', JSON.stringify(user));
            this.isLoggedInSubject.next(true);
            this.router.navigate(['/hotels']);
          } else {
            throw new Error('Invalid email or password');
          }
        }),
        catchError((err) =>
          throwError(() => new Error(`Login failed: ${err.message}`))
        )
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/auth']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
