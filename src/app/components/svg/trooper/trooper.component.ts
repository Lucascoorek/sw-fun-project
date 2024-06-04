import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-trooper',
  standalone: true,
  imports: [],
  template: `<span [innerHTML]="svgIcon"></span>`,
})
export class TrooperComponent implements OnChanges {
  @Input()
  public name?: string;

  public svgIcon: SafeHtml = '';

  httpClient = inject(HttpClient);
  sanitizer = inject(DomSanitizer);
  public ngOnChanges(): void {
    if (!this.name) {
      this.svgIcon = '';
      return;
    }
    this.httpClient
      .get(`assets/svg/${this.name}.svg`, { responseType: 'text' })
      .subscribe((value) => {
        this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(value);
      });
  }
}
