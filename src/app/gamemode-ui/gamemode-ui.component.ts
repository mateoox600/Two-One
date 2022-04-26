import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gamemode-ui',
  templateUrl: './gamemode-ui.component.html',
  styleUrls: ['./gamemode-ui.component.scss']
})
export class GamemodeUiComponent implements OnInit {

  @Input() public left: number[] = [];
  @Input() public right: number[] = [];
  @Input() public coloring: { n: number, color: string }[] = [];
  @Input() public timeLeft = 60;
  @Input() public click: (left: boolean, idx: number) => void = () => {};

  constructor() { }

  ngOnInit(): void {
  }

  color(n: number): string {
    for (const color of this.coloring) {
      if (color.n === -1 || color.n !== n) { continue; }
      return color.color;
    }
    return 'white';
  }

}
