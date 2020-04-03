import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = environment.API_HOST;

  constructor(private http: HttpClient) { }

  login(data) {
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }

}

