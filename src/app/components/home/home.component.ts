import { Component, inject } from '@angular/core';
import { SVGComponent } from '../svg/svg.component';
import { MaterialModule } from '../../material/material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SVGComponent, MaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  router = inject(Router);
  goToGame() {
    this.router.navigate(['game']);
  }
}
