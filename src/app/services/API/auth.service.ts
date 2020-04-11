import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiResponse } from '../../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public login(data) {
    return this.http.post<ApiResponse>('user/login', data);
  }

  public register(data) {
    return this.http.post<ApiResponse>('user/register', data);
  }

  public forgot(data) {
    return this.http.post<ApiResponse>('user/forgot_password', data);
  }

  public verification(data) {
    const token = { token: data.token };
    return this.http.put<ApiResponse>(`user/verified/${data.id}`, token);
  }

  public passwordRecovery(data) {
    const recoveryData = {
      token: data.token,
      password: data.password
    };

    return this.http.put<ApiResponse>(`user/password_reset/${data.id}`, recoveryData);
  }

}

