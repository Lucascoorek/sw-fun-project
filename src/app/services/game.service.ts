import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameType } from '../models/GameType';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private userOneScore = new BehaviorSubject(0);
  private userTwoScore = new BehaviorSubject(0);
  private gameType = new BehaviorSubject<GameType | null>(null);

  setGameType(value: GameType | null) {
    this.gameType.next(value);
  }
}
