import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameType, GameTypeData } from '../models/GameType';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private userOneScore$ = new BehaviorSubject(0);
  private userTwoScore$ = new BehaviorSubject(0);
  private gameType$ = new BehaviorSubject<GameType | null>(null);
  private btnOneDisabled$ = new BehaviorSubject(false);
  private btnTwoDisabled$ = new BehaviorSubject(false);

  constructor() {
    this.gameType$.subscribe((val) => {
      if (val === 'people' || val === 'starships') {
        this.btnOneDisabled$.next(true);
        this.btnTwoDisabled$.next(true);
      }
    });
  }

  setGameType(value: GameType | null) {
    this.gameType$.next(value);
  }

  getGameTypeData(): GameTypeData {
    return {
      gameType: [
        {
          title: 'spaceships',
          titleIcon: 'rocket',
          paragraphTitle: 'Play using Star Wars characters.',
          gameType: 'people',
          btnText: 'Use characters',
          btnDisabled: this.btnOneDisabled$,
        },
        {
          title: 'characters',
          titleIcon: 'person',
          paragraphTitle: 'Play using Star Wars spacecrafts',
          gameType: 'starships',
          btnText: 'Use starships',
          btnDisabled: this.btnTwoDisabled$,
        },
      ],
    };
  }
}
