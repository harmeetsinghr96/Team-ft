import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http: HttpClient) { }

  public members() {
    return this.http.get<ApiResponse>('member/members');
  }

  public showMember(data) {
    return this.http.get<ApiResponse>(`member/member/${data.id}`);
  }
}
