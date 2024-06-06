import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { SVGModel } from '../svg/svg-model';
import { GameType } from '../../models/GameType';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  name?: SVGModel;
  gameType?: GameType;

  setGameType(value: GameType) {
    this.gameType = value;
  }
}
