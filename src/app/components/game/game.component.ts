import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
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

  constructor(
    private gameSerivice: GameService,
    private detectRef: ChangeDetectorRef,
  ) {
    this.data = gameSerivice.getGameTypeData('initial');
  }
  ngOnInit(): void {
    this.gameSerivice.getGameType$().subscribe((dataType) => {
      if (dataType !== 'initial') {
        this.data = this.gameSerivice.getGameTypeData(dataType);
      }
    });
  }

  setGameType(value: DataType) {
    this.gameSerivice.setGameType(value);
  }
}
