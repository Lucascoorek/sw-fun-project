import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, inject, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SVGModel } from './svg-model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-svg',
  standalone: true,
  imports: [],
  template: `
    <div>
      <span [innerHTML]="svgIcon"></span>
    </div>
  `,
  styleUrl: './svg.component.scss',
})
export class SVGComponent implements OnChanges {
  @Input()
  public name?: SVGModel;

  public svgIcon: SafeHtml = '';

  httpClient = inject(HttpClient);
  sanitizer = inject(DomSanitizer);
  detectionRef = inject(ChangeDetectorRef);
  public ngOnChanges(): void {
    if (!this.name) {
      this.svgIcon = '';
      return;
    }
    this.httpClient
      .get(`assets/svg/${this.name}.svg`, { responseType: 'text' })
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(value);
        this.detectionRef.markForCheck();
      });
  }
}
