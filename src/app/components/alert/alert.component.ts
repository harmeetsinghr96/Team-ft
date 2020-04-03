import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() message: string;
  @Output() closeBtn = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onClose() {
    this.closeBtn.emit();
  }
}
