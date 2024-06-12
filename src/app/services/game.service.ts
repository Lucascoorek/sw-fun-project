import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, filter, map, of, switchMap, take } from 'rxjs';
import { DataType, GameTitle, GameTypeData, User, Winner } from '../models/GameType';
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
  private titleOne$ = new BehaviorSubject<GameTitle>('characters');
  private titleTwo$ = new BehaviorSubject<GameTitle>('spacecrafts');
  private entityOne$ = new BehaviorSubject<Person | Starship | null>(null);
  private entityTwo$ = new BehaviorSubject<Person | Starship | null>(null);
  private reset$ = new BehaviorSubject(false);
  private isLoadingData$ = new BehaviorSubject(false);

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
          this.titleOne$.next('spacecrafts');
          this.titleTwo$.next('spacecrafts');
        }
      } else {
        this.getGameTypeData('initial');
      }
    });

    this.gameType$
      .pipe(
        switchMap((gT) => {
          return this.apiService.getIsIdsCollected$(gT);
        }),
      )
      .subscribe((isIdCollected) => {
        if (isIdCollected) {
          this.btnOneDisabled$.next(false);
          this.btnTwoDisabled$.next(false);
        }
      });

    this.entityOne$.subscribe((entity) => {
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
    this.entityTwo$.subscribe((entity) => {
      if (entity) {
        this.titleTwo$.next(entity.result.properties.name);
        if (entity.result.description === 'A Starship') {
          const eT = entity as Starship;
          const isKnown = !isNaN(parseInt(eT.result.properties.crew));
          this.userTwoScore$.next(isKnown ? parseInt(eT.result.properties.crew) : 'unknown');
        }
        if (entity.result.description === 'A person within the Star Wars universe') {
          const eT = entity as Person;
          const isKnown = !isNaN(parseInt(eT.result.properties.mass));
          this.userTwoScore$.next(isKnown ? parseInt(eT.result.properties.mass) : 'unknown');
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
    this.isLoadingData$.next(true);
    if (this.gameType$.value !== gameType) {
      this.gameType$.next(gameType);
    }
    if (user === 'one') this.btnOneDisabled$.next(true);
    if (user === 'two') this.btnTwoDisabled$.next(true);

    combineLatest([this.apiService.getIsIdsCollected$(this.gameType$.value), this.gameType$])
      .pipe(
        filter(([val]) => val && user !== null),
        switchMap(([, gT]) => {
          if (gT === 'people') {
            return this.apiService.getPerson();
          } else if (gT === 'starships') {
            return this.apiService.getStarship();
          } else {
            return of(null);
          }
        }),
        take(1),
      )
      .subscribe((entity) => {
        const ref = user === 'one' ? this.entityOne$ : this.entityTwo$;
        ref.next(entity);
        this.isLoadingData$.next(false);
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

  getIsLoadingData$() {
    return this.isLoadingData$.asObservable();
  }

  resetGame(changeTitle = false, newTitle?: GameTitle) {
    this.btnTwoDisabled$.next(false);
    this.btnOneDisabled$.next(false);
    this.userOneScore$.next(null);
    this.userTwoScore$.next(null);
    if (changeTitle && newTitle) {
      this.titleOne$.next(newTitle);
      this.titleTwo$.next(newTitle);
    }
    this.reset$.next(false);
  }

  switchGame(dataType: DataType) {
    const newTitle: GameTitle = dataType === 'people' ? 'characters' : 'spacecrafts';
    if (newTitle) {
      this.titleOne$.next(newTitle);
      this.titleTwo$.next(newTitle);
      this.entityOne$.next(null);
      this.entityTwo$.next(null);
      this.userOneScore$.next(null);
      this.userTwoScore$.next(null);
    }
    this.resetGame();
  }

  getWinner$(): Observable<Winner> {
    return combineLatest([this.userOneScore$, this.userTwoScore$]).pipe(
      map(([scoreOne, scoreTwo]) => {
        if (typeof scoreOne === 'number' && typeof scoreTwo === 'number') {
          return {
            one: scoreOne > scoreTwo,
            two: scoreTwo > scoreOne,
          };
        } else if (typeof scoreOne === 'number' && typeof scoreTwo === 'string') {
          return {
            one: true,
            two: false,
          };
        } else if (typeof scoreOne === 'string' && typeof scoreTwo === 'number') {
          return {
            one: false,
            two: true,
          };
        } else {
          return {
            one: null,
            two: null,
          };
        }
      }),
    );
  }
}
