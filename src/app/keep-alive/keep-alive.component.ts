import { Component, OnInit } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { Gamemode } from '../utils/GamemodeUtils';

enum GameState {
  PLAYING,
  FINISHED
}

@Component({
  selector: 'app-keep-alive',
  templateUrl: './keep-alive.component.html',
  styleUrls: ['./keep-alive.component.scss']
})
export class KeepAliveComponent extends Gamemode implements OnInit {

  public GameState = GameState;

  public flashingTimer: ReturnType<typeof setInterval> | null = null;
  public state = GameState.FINISHED;
  public flashing: string | null = null;
  public timeLeft = 60;
  public timeAddition = 0;

  constructor(private analytics: AngularFireAnalytics) {
    super('keepAlive');
  }

  startGame(): void {
    super.reset();
    this.state = GameState.PLAYING;
    this.timeLeft = 60;
    this.timeAddition = 0;
  }

  endGame(): void {
    const time = Date.now() - this.start;

    this.state = GameState.FINISHED;
    this.time = time;
    this.bestTime = time > this.bestTime ? time : this.bestTime;
    this.newRecord = time > this.bestTime;

    window.localStorage.setItem('keepAlive.best', this.bestTime.toString());
    this.analytics.logEvent('keep_alive_finished');
  }

  click(left: boolean, idx: number): void {
    const won = (left ? this.left : this.right)[idx] === this.pickedNumber;
    this.timeAddition += won ? 10 : -10;
    this.flashing = won ? '#145c14' : '#5c1414';
    this.newListsAndNumber();

    if (this.flashingTimer) {
      clearTimeout(this.flashingTimer);
    }
    this.flashingTimer = null;

    this.flashingTimer = setTimeout(() => {
      this.flashing = null;
    }, 250);
  }

  ngOnInit(): void {
    setInterval(() => {
      if (this.state === GameState.FINISHED) { return; }
      this.timeLeft = ((this.start + 60 * 1000) - Date.now()) + this.timeAddition * 1000;
      if (this.timeLeft <= 0) { this.endGame(); }
    }, 10);
  }

}
