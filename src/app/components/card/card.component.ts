import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { SVGComponent } from '../svg/svg.component';
import { SVGModel } from '../svg/svg-model';
import { CommonModule } from '@angular/common';
import { GameType } from '../../models/GameType';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MaterialModule, SVGComponent, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() name?: SVGModel;
  @Input() title = '';
  @Input() titleIcon?: SVGModel;
  @Input() paragraphTitle = '';
  @Input() btnText = '';
  @Input() gameType: GameType = 'people';

  @Output() handleClick = new EventEmitter<GameType>();

  emitType(val: GameType) {
    this.handleClick.emit(val);
  }
}
