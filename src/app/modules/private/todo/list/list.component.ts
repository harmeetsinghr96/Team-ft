import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public panelOpenState = false;
  public movies = [
    {
      title: 'I',
      poster: 'https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<{title: string, poster: string}[]>) {
    console.log(event);
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

}
