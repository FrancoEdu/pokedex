import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Pokemon } from 'src/model/pokemon';
import { Observable, map, tap } from 'rxjs';
import { BasePokemonReponse } from 'src/model/BasePokemonResponse';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiURL: string = "https://pokeapi.co/api/v2/pokemon/"

  constructor(
    private http: HttpClient
  ) { }

  getPokemonListBase(): Observable<BasePokemonReponse>{
    return this.http.get(`${this.apiURL}?limit=256&offset=0`).pipe(
      map((response) => response as BasePokemonReponse)
      // tap((data) => console.log(data))
    )
  }


  getPokemon(name: string): Observable<Pokemon> {
    return this.http.get(`${this.apiURL}${name}`).pipe(
      map((response) => response as Pokemon)
    )
  }
}
