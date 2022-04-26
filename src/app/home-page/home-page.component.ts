import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public timeRush: number = Number(window.localStorage.getItem('timeRush.best')) || -1;
  public keepAlive: number = Number(window.localStorage.getItem('keepAlive.best')) || -1;

  constructor() { }

  ngOnInit(): void {
  }

}
