import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

import * as types from '../_actions/_types/members.type';
import * as MemberActions from '../_actions/member.action';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { MembersService } from 'src/app/services/API/members.service';

@Injectable()
export class MemberEffects {

  constructor(private actions$: Actions,
              private memberService: MembersService,
              private router: Router) { }

  @Effect()
  Member = this.actions$.pipe(
    ofType(types.MEMBER_LIST_START),
    switchMap(() => {
      return this.memberService.members();
    }),
    map((res: any) => {
      return new MemberActions.MemberList({ members: res.data.members });
    }),
    catchError(errorRes => {
      let errorMessage = 'An unknown error occurred!';
      if (!errorRes.error || !errorRes.error.message) {
        return of(new MemberActions.MemberListFailed(errorMessage));
      }

      if (errorRes.error.message) {
        errorMessage = errorRes.error.message;
        return of(new MemberActions.MemberListFailed(errorMessage));
      }
      return of(new MemberActions.MemberListFailed(errorMessage));
    })
  );

  @Effect()
  Forgot = this.actions$.pipe(
    ofType(types.MEMBER_SHOW_START),

    switchMap((memberData: MemberActions.MemberShowStart) => {

      const member: User = {
        id: memberData.payload.id
      };

      return this.memberService.showMember(member).pipe(
        map((res: any) => {
          return new MemberActions.MemberShow({ member: res.data.member });
        }),
        catchError((errorRes: any) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.message) {
            return of(new MemberActions.MemberShowFailed(errorMessage));
          }

          if (errorRes.error.message) {
            errorMessage = errorRes.error.message;
            return of(new MemberActions.MemberShowFailed(errorMessage));
          }
          return of(new MemberActions.MemberShowFailed(errorMessage));
        })
      );
    })
  );
}
