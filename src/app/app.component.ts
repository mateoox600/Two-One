import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      if (!(e instanceof NavigationEnd)) { return; }
      let route: ActivatedRoute = this.router.routerState.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      if (route.snapshot.data.title) {
        this.titleService.setTitle(`Two One - ${route.snapshot.data.title}`);
      }else {
        this.titleService.setTitle(`Two One`);
      }
    });
  }
}
