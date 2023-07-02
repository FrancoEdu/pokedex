import { Component, Injector, OnInit } from '@angular/core';
import { PokemonService } from 'src/service/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent{
  title = 'pokemon';
}
