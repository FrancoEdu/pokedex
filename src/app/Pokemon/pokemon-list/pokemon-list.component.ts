import { Component, OnInit } from '@angular/core';
import { Result, BasePokemonReponse } from 'src/model/BasePokemonResponse';
import { Pokemon } from 'src/model/pokemon';
import { PokemonService } from 'src/service/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit{
  private pokemonsImage:string = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/'
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
          this.pokemons.push({
            base_experience: data.base_experience,
            height: data.height,
            id: data.id,
            name: data.name,
            order: data.order,
            weight: data.weight,
            image: this.getImage(data.id)
          })
        })
      }
    })
  }

  getImage(id:number):string {
    let imageURL = ""
    const idString = id.toString();

    if(idString.length == 3){
      imageURL = `${this.pokemonsImage}${idString}.png`;
    } else if(idString.length == 2){
      imageURL = `${this.pokemonsImage}0${idString}.png`;
    }else {
      imageURL = `${this.pokemonsImage}00${idString}.png`;
    }

    return imageURL
  }
}
