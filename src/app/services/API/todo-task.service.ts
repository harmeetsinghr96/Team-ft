import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoTaskService {

  constructor(private http: HttpClient) { }

  public todos() {
    return this.http.get<ApiResponse>('todo/todos');
  }
}
