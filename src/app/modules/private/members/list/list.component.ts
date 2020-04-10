import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ViewComponent } from '../view/view.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  active: boolean;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  public tableData: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', active: true },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', active: true },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', active: false },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', active: true },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', active: true },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', active: true },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', active: true },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', active: true },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', active: true },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', active: true },
    { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', active: true },
  ];

  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'active', 'active'];
  public dataSource = new MatTableDataSource<PeriodicElement>(this.tableData);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openBottomSheet() {
    this.bottomSheet.open<any>(ViewComponent);
  }
}
