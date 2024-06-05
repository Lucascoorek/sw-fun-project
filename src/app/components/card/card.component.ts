import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { SVGComponent } from '../svg/svg.component';
import { SVGModel } from '../svg/svg-model';
import { CommonModule } from '@angular/common';

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
}
