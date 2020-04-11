import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ViewComponent } from '../view/view.component';
import { Store } from '@ngrx/store';
import * as state from '../../../../_store/store.reducers';
import * as MemberActions from '../../../../_store/_actions/member.action';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  public members: User[] = [];
  public error: string;
  public member: User;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public displayedColumns: string[] = ['#', 'image', 'name', 'email', 'admin', 'super_admin', 'active'];
  public membersDataSource: MatTableDataSource<User>;

  constructor(private bottomSheet: MatBottomSheet, private store$: Store<state.AppState>) { }

  ngOnInit() {
    this.store$.select('members').subscribe(appState => {
      this.members = appState.members;
      this.error = appState.error;
      this.member = appState.member;
    });

    this.loadMemberAction();

    this.membersDataSource = new MatTableDataSource(this.members);
    this.membersDataSource.paginator = this.paginator;
    this.membersDataSource.sort = this.sort;
  }

  private loadMemberAction() {
    this.store$.dispatch(new MemberActions.MemberListStart());
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.membersDataSource.filter = filterValue.trim().toLowerCase();

    if (this.membersDataSource.paginator) {
      this.membersDataSource.paginator.firstPage();
    }
  }

  public openBottomSheet(id: string) {
    const userId = id;
    this.store$.dispatch(new MemberActions.MemberShowStart({ id: userId }));

    setTimeout(() => {
      if (this.member !== null) {
        this.bottomSheet.open<any>(ViewComponent, {
          data: { member: this.member }
        });
      }
    }, 700);
  }
}
