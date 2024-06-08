import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/Person';
import { Starship } from '../models/Starship';
import { Page } from '../models/Page';
import { Observable, take } from 'rxjs';
import { GameType } from '../models/GameType';

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

  collectIds(url: string, destination: string[], type: GameType) {
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
            const id = this.peopleIds[Math.floor(Math.random() * this.peopleIds.length)];
            this.getRandomPerson(id);
          }
          if (type === 'starships') {
            const id = this.starshipsIds[Math.floor(Math.random() * this.starshipsIds.length)];
            this.getRandomStarship(id);
          }
        }
      });
  }

  collectCharactersIds() {
    this.collectIds(`${this.baseUrl}${this.peopleUrl}`, this.peopleIds, 'people');
  }

  collectStarshipsIds() {
    this.collectIds(`${this.baseUrl}${this.starshipsUrl}`, this.starshipsIds, 'starships');
  }

  getPage(url: string): Observable<Page> {
    return this.http.get<Page>(url);
  }

  getRandomPerson(id: string): void {
    this.http.get<Person>(`${this.baseUrl}${this.peopleUrl}/${id}`).subscribe();
  }

  getRandomStarship(id: string): void {
    this.http.get<Starship>(`${this.baseUrl}${this.starshipsUrl}/${id}`).subscribe();
  }
}
