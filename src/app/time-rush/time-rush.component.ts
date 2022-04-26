import { Component, OnInit } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { Gamemode } from '../utils/GamemodeUtils';

enum GameState {
  PLAYING,
  DISPLAYING,
  WON,
  LOST
}

@Component({
  selector: 'app-time-rush',
  templateUrl: './time-rush.component.html',
  styleUrls: ['./time-rush.component.scss']
})
export class TimeRushComponent extends Gamemode implements OnInit {

  public GameState = GameState;

  public displayTimeout: ReturnType<typeof setInterval> | null = null;
  public state: GameState = GameState.LOST;
  public choice = -1;
  public gameWon = Number(window.localStorage.getItem('timeRush.won')) || 0;
  public gameLost = Number(window.localStorage.getItem('timeRush.lost')) || 0;
  public timeLeft = 60;

  constructor(private analytics: AngularFireAnalytics) {
    super('timeRush', { bestTimeIfNone: Number.POSITIVE_INFINITY });
  }

  startGame(): void {
    super.reset();
    this.choice = -1;
    this.timeLeft = 60;

    this.state = GameState.PLAYING;
  }

  endGame(won: boolean): void {
    const time = Date.now() - this.start;

    const isNewBest = won && time < this.bestTime;

    this.state = won ? GameState.WON : GameState.DISPLAYING;
    this.time = won ? time : 0;
    this.newRecord = isNewBest;
    this.bestTime = isNewBest ? time : this.bestTime;
    this.gameWon += won ? 1 : 0;
    this.gameLost += won ? 0 : 1;

    window.localStorage.setItem('timeRush.won', this.gameWon.toString());
    window.localStorage.setItem('timeRush.lost', this.gameLost.toString());
    window.localStorage.setItem('timeRush.best', this.bestTime.toString());

    if (!won) { this.displayTimeout = setTimeout(() => this.state = GameState.LOST, 5 * 1000); }
    this.analytics.logEvent('time_rush_finished');
  }

  click(left: boolean, idx: number): void {
    if (this.state === GameState.DISPLAYING) {
      if (this.displayTimeout) { clearTimeout(this.displayTimeout); }
      this.displayTimeout = null;
      this.state = GameState.LOST;
      return;
    }
    const num = (left ? this.left : this.right)[idx];
    this.choice = num;
    this.endGame(num === this.pickedNumber);
  }

  ngOnInit(): void {
    setInterval(() => {
      if (this.state !== GameState.PLAYING) { return; }
      this.timeLeft = (this.start + 60 * 1000) - Date.now();
      if (this.timeLeft <= 0) { this.endGame(false); }
    }, 10);
  }

}
