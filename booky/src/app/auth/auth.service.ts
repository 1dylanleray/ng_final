import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // json-server URL

  constructor(private http: HttpClient) {}

  signup(email: string, password: string, name: string): Observable<any> {
    const newUser = { email, password, name };
    return this.http
      .post(`${this.baseUrl}/users`, newUser)
      .pipe(catchError((err) => throwError(() => new Error(err.message))));
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/users?email=${email}&password=${password}`)
      .pipe(catchError((err) => throwError(() => new Error(err.message))));
  }
}
