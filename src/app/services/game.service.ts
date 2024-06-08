import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataType, GameTypeData } from '../models/GameType';
import { getInitialData } from '../data/initial-data';
import { getCharactersData } from '../data/characters-data';
import { getStarshipsData } from '../data/starships-data';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private userOneScore$ = new BehaviorSubject(0);
  private userTwoScore$ = new BehaviorSubject(0);
  private gameType$ = new BehaviorSubject<DataType>('initial');
  private btnOneDisabled$ = new BehaviorSubject(false);
  private btnTwoDisabled$ = new BehaviorSubject(false);
  private entityOne = new BehaviorSubject(null);
  private entityTwo = new BehaviorSubject(null);

  constructor() {
    this.gameType$.subscribe((val) => {
      if (val === 'people' || val === 'starships') {
        this.btnOneDisabled$.next(true);
        this.btnTwoDisabled$.next(true);
      } else {
        this.getGameTypeData('initial');
      }
    });
  }

  setGameType(value: DataType) {
    this.gameType$.next(value);
  }

  getGameType$() {
    return this.gameType$.asObservable();
  }

  getGameTypeData(dataType: DataType = 'initial'): GameTypeData | null {
    switch (dataType) {
      case 'initial': {
        const initData = getInitialData();
        const mappedData: GameTypeData = {
          gameType: initData.gameType.map((data, i) => ({
            ...data,
            btnDisabled: i === 0 ? this.btnOneDisabled$ : this.btnTwoDisabled$,
          })),
        };
        return mappedData;
      }
      case 'people': {
        const initData = getCharactersData();
        const mappedData: GameTypeData = {
          gameType: initData.gameType.map((data, i) => ({
            ...data,
            btnDisabled: i === 0 ? this.btnOneDisabled$ : this.btnTwoDisabled$,
          })),
        };
        return mappedData;
      }
      case 'starships': {
        const initData = getStarshipsData();
        const mappedData: GameTypeData = {
          gameType: initData.gameType.map((data, i) => ({
            ...data,
            btnDisabled: i === 0 ? this.btnOneDisabled$ : this.btnTwoDisabled$,
          })),
        };
        return mappedData;
      }
      default: {
        return null;
      }
    }
  }
}
