import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, of, switchMap } from 'rxjs';
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
  private userOneScore$ = new BehaviorSubject<null | number | 'unknown'>(null);
  private userTwoScore$ = new BehaviorSubject<null | number | 'unknown'>(null);
  private gameType$ = new BehaviorSubject<DataType>('initial');
  private btnOneDisabled$ = new BehaviorSubject(false);
  private btnTwoDisabled$ = new BehaviorSubject(false);
  private titleOne$ = new BehaviorSubject('characters');
  private titleTwo$ = new BehaviorSubject('spacecrafts');
  private entityOne = new BehaviorSubject<Person | Starship | null>(null);
  private entityTwo = new BehaviorSubject<Person | Starship | null>(null);
  private reset$ = new BehaviorSubject(false);

  constructor(private apiService: ApiService) {
    this.gameType$.subscribe((val) => {
      if (val === 'people' || val === 'starships') {
        this.btnOneDisabled$.next(true);
        this.btnTwoDisabled$.next(true);
        if (val === 'people') {
          this.apiService.collectCharactersIds();
          this.titleOne$.next('characters');
          this.titleTwo$.next('characters');
        }
        if (val === 'starships') {
          this.apiService.collectStarshipsIds();
          this.titleOne$.next('starships');
          this.titleTwo$.next('starships');
        }
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

    this.entityOne.subscribe((entity) => {
      if (entity) {
        this.titleOne$.next(entity.result.properties.name);
        if (entity.result.description === 'A Starship') {
          const eT = entity as Starship;
          const isKnown = !isNaN(parseInt(eT.result.properties.crew));
          this.userOneScore$.next(isKnown ? parseInt(eT.result.properties.crew) : 'unknown');
        }
        if (entity.result.description === 'A person within the Star Wars universe') {
          const eT = entity as Person;
          const isKnown = !isNaN(parseInt(eT.result.properties.mass));
          this.userOneScore$.next(isKnown ? parseInt(eT.result.properties.mass) : 'unknown');
        }
      }
    });
    this.entityTwo.subscribe((entity) => {
      if (entity) {
        this.titleTwo$.next(entity.result.properties.name);
        if (entity.result.description === 'A Starship') {
          const eT = entity as Starship;
          this.userTwoScore$.next(parseInt(eT.result.properties.crew));
        }
        if (entity.result.description === 'A person within the Star Wars universe') {
          const eT = entity as Person;
          this.userTwoScore$.next(parseInt(eT.result.properties.mass));
        }
      }
    });

    combineLatest([this.userOneScore$, this.userTwoScore$]).subscribe(([scoreOne, scoreTwo]) => {
      if (scoreOne !== null && scoreTwo !== null) {
        this.reset$.next(true);
      }
    });
  }

  dispatchGameData({ gameType, user }: { gameType: DataType; user: User | null }) {
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
            title: i === 0 ? this.titleOne$ : this.titleTwo$,
            score: i === 0 ? this.userOneScore$ : this.userTwoScore$,
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
            title: i === 0 ? this.titleOne$ : this.titleTwo$,
            score: i === 0 ? this.userOneScore$ : this.userTwoScore$,
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
            title: i === 0 ? this.titleOne$ : this.titleTwo$,
            score: i === 0 ? this.userOneScore$ : this.userTwoScore$,
          })),
        };
        return mappedData;
      }
      default: {
        return null;
      }
    }
  }

  getResetStatus$() {
    return this.reset$.asObservable();
  }

  resetGame(changeGame = false) {
    const gameType = this.gameType$.value;
    const newGameType = changeGame ? (gameType === 'people' ? 'starships' : 'people') : gameType;
    this.gameType$.next(newGameType);
    this.btnTwoDisabled$.next(false);
    this.btnOneDisabled$.next(false);
    this.userOneScore$.next(null);
    this.userTwoScore$.next(null);
    this.reset$.next(false);
  }

  switchGame(dataType: DataType) {
    console.log('switchGame with: => ', dataType);
    this.resetGame(true);
  }
}
