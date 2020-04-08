import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as state from '../../_store/store.reducer';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  public user: User;
  public company: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver, private store$: Store<state.AppState>) {}

  ngOnInit() {
    this.store$.select('auth').subscribe(appState => {
      this.user = appState.user;
      this.company = this.user.company;
    });
  }

}
