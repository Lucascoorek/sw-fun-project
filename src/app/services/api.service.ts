import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/Person';
import { Starship } from '../models/Starship';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'https://www.swapi.tech/api';

  constructor() {
    this.getRandomPerson();
    this.getRandomStarship();
  }

  getRandomPerson(): void {
    this.http.get<Person>(`${this.baseUrl}/people/${4}`).subscribe((data) => console.log(data));
  }

  getRandomStarship(): void {
    this.http
      .get<Starship>(`${this.baseUrl}/starships/${2}`)
      .subscribe((data) => console.log(data));
  }
}
