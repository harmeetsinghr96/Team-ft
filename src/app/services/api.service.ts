import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as state from '../_store/store.reducer';
import { AuthResponse } from '../interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = environment.API_HOST;

  constructor(private http: HttpClient, private store$: Store<state.AppState>) { }

  public login(data) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/user/login`, data);
  }

  public register(data) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/user/register`, data);
  }

}

