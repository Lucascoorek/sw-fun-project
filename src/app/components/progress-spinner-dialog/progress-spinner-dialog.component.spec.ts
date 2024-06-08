import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressSpinnerDialogComponent } from './progress-spinner-dialog.component';

describe('ProgressSpinnerDialogComponent', () => {
  let component: ProgressSpinnerDialogComponent;
  let fixture: ComponentFixture<ProgressSpinnerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressSpinnerDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressSpinnerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
