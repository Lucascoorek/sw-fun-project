import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { DataType, User } from '../../models/GameType';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { ProgressSpinnerDialogService } from '../progress-spinner-dialog.service';
import { ApiService } from '../../services/api.service';
import { MaterialModule } from '../../material/material.module';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

type GameName = 'Starships' | 'Characters' | null;

@UntilDestroy()
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CardComponent, CommonModule, MaterialModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {
  data;
  resetStatus$;
  gameTopTitle = 'Select a resource you want to play with:';
  winner$;
  currentTitle: GameName | null = null;
  switchTo: GameName | null = null;

  constructor(
    private gameSerivice: GameService,
    private progressSpinerService: ProgressSpinnerDialogService,
    private apiService: ApiService,
  ) {
    this.data = gameSerivice.getGameTypeData('initial');
    this.resetStatus$ = gameSerivice.getResetStatus$();
    this.winner$ = gameSerivice.getWinner$();
  }
  ngOnInit(): void {
    this.gameSerivice
      .getGameType$()
      .pipe(untilDestroyed(this))
      .subscribe((dataType) => {
        if (dataType !== 'initial') {
          this.data = this.gameSerivice.getGameTypeData(dataType);
          this.gameTopTitle = this.changeTopTitle(dataType);
          this.progressSpinerService.openDialog(
            `Loading ${dataType}...`,
            this.apiService.getIsIdsCollected$(dataType),
          );
        }
        if (dataType === 'people') {
          this.currentTitle = 'Characters';
          this.switchTo = 'Starships';
        } else if (dataType === 'starships') {
          this.currentTitle = 'Starships';
          this.switchTo = 'Characters';
        } else this.switchTo = null;
      });
  }

  handleClick({ gameType, user }: { gameType: DataType; user: User | null }) {
    this.gameSerivice.dispatchGameData({ gameType, user });
    this.progressSpinerService.openDialog(
      `Loading ${gameType}...`,
      this.gameSerivice.getIsLoadingData$(),
    );
  }

  changeTopTitle(dataType: DataType) {
    switch (dataType) {
      case 'initial': {
        return 'Select a resource you want to play with:';
      }
      case 'people': {
        return 'Play a game using Star Wars characters';
      }
      case 'starships': {
        return 'Play a game using Star Wars spacecrafts';
      }
      default:
        return 'Select a resource you want to play with:';
    }
  }

  resetGame() {
    this.gameSerivice.resetGame(true, this.currentTitle ? this.currentTitle : undefined);
  }

  switchGame(gameType: GameName) {
    const arg: () => DataType = () => {
      if (gameType === 'Characters') {
        return 'people';
      } else if (gameType === 'Starships') {
        return 'starships';
      } else {
        return 'initial';
      }
    };
    const newGameType = arg();
    this.data = this.gameSerivice.getGameTypeData(newGameType);
    this.gameSerivice.dispatchGameData({ gameType: newGameType, user: null });
    this.gameSerivice.switchGame(newGameType);
  }
}
