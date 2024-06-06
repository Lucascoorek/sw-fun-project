import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { SVGModel } from '../svg/svg-model';
import { GameType } from '../../models/GameType';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  name?: SVGModel;
  gameType?: GameType;
  data;

  constructor(private gameSerivice: GameService) {
    this.data = gameSerivice.getGameTypeData();
  }

  setGameType(value: GameType) {
    this.gameSerivice.setGameType(value);
  }
}
