import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { DataType } from '../../models/GameType';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {
  data;
  gameTopTitle = 'Select a resource you want to play with:';

  constructor(private gameSerivice: GameService) {
    this.data = gameSerivice.getGameTypeData('initial');
  }
  ngOnInit(): void {
    this.gameSerivice.getGameType$().subscribe((dataType) => {
      if (dataType !== 'initial') {
        this.data = this.gameSerivice.getGameTypeData(dataType);
        this.gameTopTitle = this.changeTopTitle(dataType);
      }
    });
  }

  setGameType(value: DataType) {
    this.gameSerivice.setGameType(value);
  }

  changeTopTitle(dataType: DataType) {
    switch (dataType) {
      case 'initial': {
        return 'Select a resource you want to play with:';
      }
      case 'people': {
        return 'A game using Star Wars characters';
      }
      case 'starships': {
        return 'A game using Star Wars spacecrafts';
      }
      default:
        return 'Select a resource you want to play with:';
    }
  }
}
