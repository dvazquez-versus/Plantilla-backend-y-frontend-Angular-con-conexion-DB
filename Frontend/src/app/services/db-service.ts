import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Para respuestas JSON (default)
  // ✅ Para respuestas tipo texto plano (por ejemplo, el "pong")
  get(path: string): Observable<string> {
    return this.http.get(`${this.baseUrl}${path}`, { responseType: 'text' });
  }

  post<T>(path: string, body: any, options = {}): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body, options);
  }

  put<T>(path: string, body: any, options = {}): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${path}`, body, options);
  }

  delete<T>(path: string, options = {}): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`, options);
  }

}
