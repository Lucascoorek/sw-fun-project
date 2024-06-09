import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, of, switchMap } from 'rxjs';
import { DataType, GameTypeData, User } from '../models/GameType';
import { getInitialData } from '../data/initial-data';
import { getCharactersData } from '../data/characters-data';
import { getStarshipsData } from '../data/starships-data';
import { ApiService } from './api.service';
import { Person } from '../models/Person';
import { Starship } from '../models/Starship';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private userOneScore$ = new BehaviorSubject(0);
  private userTwoScore$ = new BehaviorSubject(0);
  private gameType$ = new BehaviorSubject<DataType>('initial');
  private btnOneDisabled$ = new BehaviorSubject(false);
  private btnTwoDisabled$ = new BehaviorSubject(false);
  private entityOne = new BehaviorSubject<Person | Starship | null>(null);
  private entityTwo = new BehaviorSubject<Person | Starship | null>(null);

  constructor(private apiService: ApiService) {
    this.gameType$.subscribe((val) => {
      if (val === 'people' || val === 'starships') {
        this.btnOneDisabled$.next(true);
        this.btnTwoDisabled$.next(true);
        if (val === 'people') this.apiService.collectCharactersIds();
        if (val === 'starships') this.apiService.collectStarshipsIds();
      } else {
        this.getGameTypeData('initial');
      }
    });

    this.apiService.getIsIdsCollected$().subscribe((isIdCollected) => {
      if (isIdCollected) {
        this.btnOneDisabled$.next(false);
        this.btnTwoDisabled$.next(false);
      }
    });
  }

  dispatchGameData({ gameType, user }: { gameType: DataType; user: User | null }) {
    console.log(gameType, user);
    if (this.gameType$.value !== gameType) {
      this.gameType$.next(gameType);
    }
    if (user === 'one') this.btnOneDisabled$.next(true);
    if (user === 'two') this.btnTwoDisabled$.next(true);

    this.apiService
      .getIsIdsCollected$()
      .pipe(
        filter((val) => val && user !== null),
        switchMap(() => {
          if (gameType === 'people') {
            return this.apiService.getPerson();
          } else if (gameType === 'starships') {
            return this.apiService.getStarship();
          } else {
            return of(null);
          }
        }),
      )
      .subscribe((entity) => {
        const ref = user === 'one' ? this.entityOne : this.entityTwo;
        ref.next(entity);
      });
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
