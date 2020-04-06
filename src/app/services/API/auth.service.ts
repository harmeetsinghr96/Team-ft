import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as state from '../../_store/store.reducer';
import { AuthResponse } from '../../interfaces/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private store$: Store<state.AppState>) { }

  public login(data) {
    return this.http.post<AuthResponse>('user/login', data);
  }

  public register(data) {
    return this.http.post<AuthResponse>('user/register', data);
  }

  public forgot(data) {
    return this.http.post<AuthResponse>('user/forgot_password', data);
  }

  public verification(data) {
    const token = { token: data.token };
    return this.http.put<AuthResponse>(`user/verified/${data.id}`, token);
  }

  public passwordRecovery(data) {
    const recoveryData = {
      token: data.token,
      password: data.password
    };

    return this.http.put<AuthResponse>(`user/password_reset/${data.id}`, recoveryData);
  }

}

