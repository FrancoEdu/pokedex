import { Component, OnInit } from '@angular/core';
import { Result, Root } from 'src/model/BasePokemonResponse';
import { Pokemon } from 'src/model/pokemon';
import { PokemonService } from 'src/service/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit{

  private results : Result[] = [];
  pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService){}

  ngOnInit(): void {
    this.get()
  }

  get(): void{
    this.pokemonService.getPokemonListBase().subscribe(data => {
      this.results = data.results
      for(let i = 0; i < this.results.length; i++){
        this.pokemonService.getPokemon(this.results[i].name).subscribe(data => {
          this.pokemons.push(data)
        })
      }
    })
  }
}
