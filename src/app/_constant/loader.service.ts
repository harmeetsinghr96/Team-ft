import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public attach = new BehaviorSubject<boolean>(false);

  constructor() { }

  public state(load: boolean) {
    this.attach.next(load);
  }
}
