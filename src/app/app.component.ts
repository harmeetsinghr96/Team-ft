import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { LoaderService } from './services/shared/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'TEAM';

  loading = true;

  constructor(private router: Router, private loader: LoaderService) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loader.state(true);
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loader.state(false);
      }
    });
  }

  ngAfterViewInit() {
    this.loader.attach.subscribe(data => {
      setTimeout(() => {
        this.loading = data;
      }, 500);
    });
  }
}
