import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataType, GameTypeData } from '../models/GameType';
import { getInitialData } from '../data/initial-data';
import { getCharactersData } from '../data/characters-data';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private userOneScore$ = new BehaviorSubject(0);
  private userTwoScore$ = new BehaviorSubject(0);
  private gameType$ = new BehaviorSubject<DataType>('initial');
  private btnOneDisabled$ = new BehaviorSubject(false);
  private btnTwoDisabled$ = new BehaviorSubject(false);

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
        const initData = getInitialData() as unknown as GameTypeData;
        initData.gameType = initData.gameType.map((data, i) => ({
          ...data,
          btnDisabled: i === 0 ? this.btnOneDisabled$ : this.btnTwoDisabled$,
        }));
        return initData;
      }
      case 'people': {
        const initData = getCharactersData() as unknown as GameTypeData;
        console.log(initData);
        initData.gameType = initData.gameType.map((data, i) => ({
          ...data,
          btnDisabled: i === 0 ? this.btnOneDisabled$ : this.btnTwoDisabled$,
        }));
        console.log(initData);
        return initData;
      }
      default: {
        return null;
      }
    }
  }
}
