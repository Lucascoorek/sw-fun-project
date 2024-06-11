import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/Person';
import { Starship } from '../models/Starship';
import { Page } from '../models/Page';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { DataType, GameType } from '../models/GameType';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'https://www.swapi.tech/api/';
  private peopleIds: string[] = [];
  private starshipsIds: string[] = [];
  private starshipsUrl: GameType = 'starships';
  private peopleUrl: GameType = 'people';
  private isIdCollected$ = new BehaviorSubject(false);
  private isStarshipsIdsCollected$ = new BehaviorSubject(false);
  private isPeopleIdsCollected$ = new BehaviorSubject(false);

  private collectIds(url: string, destination: string[], type: GameType): void {
    if (type === 'people') {
      this.isPeopleIdsCollected$.next(false);
    }
    if (type === 'starships') {
      this.isStarshipsIdsCollected$.next(false);
    }
    this.getPage(url)
      .pipe(take(1))
      .subscribe((data) => {
        data.results.forEach((el) => {
          if (el.uid && el.uid !== '') {
            destination.push(el.uid);
          }
        });
        if (data.next) {
          this.collectIds(data.next, destination, type);
        } else if (data.next === null) {
          if (type === 'people') {
            this.isPeopleIdsCollected$.next(true);
          }
          if (type === 'starships') {
            this.isStarshipsIdsCollected$.next(true);
          }
        }
      });
  }

  collectCharactersIds(): void {
    if (this.peopleIds.length === 0)
      this.collectIds(`${this.baseUrl}${this.peopleUrl}`, this.peopleIds, 'people');
  }

  collectStarshipsIds(): void {
    if (this.starshipsIds.length === 0)
      this.collectIds(`${this.baseUrl}${this.starshipsUrl}`, this.starshipsIds, 'starships');
  }

  private getPage(url: string): Observable<Page> {
    return this.http.get<Page>(url);
  }

  private getRandomPerson(id: string): Observable<Person> {
    return this.http.get<Person>(`${this.baseUrl}${this.peopleUrl}/${id}`);
  }

  private getRandomStarship(id: string): Observable<Starship> {
    return this.http.get<Starship>(`${this.baseUrl}${this.starshipsUrl}/${id}`);
  }

  getIsIdsCollected$(type: DataType): Observable<boolean> {
    let ref;
    if (type === 'people') {
      ref = this.isPeopleIdsCollected$;
    } else if (type === 'starships') {
      ref = this.isStarshipsIdsCollected$;
    } else {
      ref = new BehaviorSubject(false);
    }
    return ref;
  }

  getPerson(): Observable<Person> {
    const id = this.peopleIds[Math.floor(Math.random() * this.peopleIds.length)];
    return this.getRandomPerson(id);
  }

  getStarship(): Observable<Starship> {
    const id = this.starshipsIds[Math.floor(Math.random() * this.starshipsIds.length)];
    return this.getRandomStarship(id);
  }
}
