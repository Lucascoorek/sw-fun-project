import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { SVGComponent } from '../svg/svg.component';
import { SVGModel } from '../svg/svg-model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MaterialModule, SVGComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() name: SVGModel = 'trooper';
}
