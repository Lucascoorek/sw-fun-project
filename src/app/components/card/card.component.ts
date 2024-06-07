import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { SVGComponent } from '../svg/svg.component';
import { SVGModel } from '../svg/svg-model';
import { CommonModule } from '@angular/common';
import { DataType } from '../../models/GameType';

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

  @Output() handleClick = new EventEmitter<DataType>();

  emitType(val: DataType) {
    this.handleClick.emit(val);
  }
}
