import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { SVGComponent } from '../svg/svg.component';
import { SVGModel } from '../svg/svg-model';
import { CommonModule } from '@angular/common';
import { DataType, User, Winner } from '../../models/GameType';

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
  @Input() gameType: DataType = 'initial';
  @Input() btnDisabled: boolean | null = true;
  @Input() user: User | null = null;
  @Input() score: number | null | 'unknown' = null;
  @Input() winner: Winner | null = null;

  @Output() emitClick = new EventEmitter<{ gameType: DataType; user: User | null }>();

  emitType(gameType: DataType, user: User | null) {
    this.emitClick.emit({ gameType, user });
  }
}
