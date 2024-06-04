import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/Person';
import { Starship } from '../models/Starship';
import { Page } from '../models/Page';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'https://www.swapi.tech/api/';
  private peopleIds: string[] = [];
  private starshipsIds: string[] = [];
  private starshipsUrl = 'starships';
  private peopleUrl = 'people';

  constructor() {
    // this.getRandomPerson();
    // this.getRandomStarship();
    this.collectIds(`${this.baseUrl}${this.peopleUrl}`, this.peopleIds);
    this.collectIds(`${this.baseUrl}${this.starshipsUrl}`, this.starshipsIds);
  }

  collectIds(url: string, destination: string[]) {
    this.getPage(url)
      .pipe(take(1))
      .subscribe((data) => {
        data.results.forEach((el) => {
          if (el.uid && el.uid !== '') {
            destination.push(el.uid);
          }
        });

        if (data.next) {
          this.collectIds(data.next, destination);
        }
      });
  }

  getPage(url: string): Observable<Page> {
    return this.http.get<Page>(url);
  }

  getRandomPerson(id: string): void {
    this.http
      .get<Person>(`${this.baseUrl}${this.peopleUrl}/${id}`)
      .subscribe((data) => console.log(data));
  }

  getRandomStarship(id: string): void {
    this.http
      .get<Starship>(`${this.baseUrl}${this.starshipsUrl}/${id}`)
      .subscribe((data) => console.log(data));
  }
}
