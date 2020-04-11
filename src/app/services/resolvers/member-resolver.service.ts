
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as appState from '../../_store/store.reducers';
import * as MemberActions from '../../_store/_actions/member.action';
import * as types from '../../_store/_actions/_types/members.type';
import { User } from 'src/app/models/user.model';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class MemberResolver implements Resolve<User[]> {

  constructor(private store$: Store<appState.AppState>, private actions$: Actions) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store$.dispatch(new MemberActions.MemberListStart());
    return this.actions$.pipe(ofType(types.MEMBER_LIST), take(1));
  }
}
