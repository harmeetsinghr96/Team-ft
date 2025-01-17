import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import * as state from '../../../../_store/store.reducers';
import * as MemberActions from '../../../../_store/_actions/member.action';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  public folders: Array<any> = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];

  public member: User;
  public company: any;

  constructor(private bottomSheetRef: MatBottomSheetRef<ViewComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) private data: any,
              private store$: Store<state.AppState>) { }

  ngOnInit() {
    this.member = this.data.member;
  }

  openLink(event: MouseEvent) {
    this.store$.dispatch(new MemberActions.ResetMemberShow());
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
