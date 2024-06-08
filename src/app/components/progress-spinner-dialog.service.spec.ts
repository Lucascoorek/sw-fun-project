import { TestBed } from '@angular/core/testing';

import { ProgressSpinnerDialogService } from './progress-spinner-dialog.service';

describe('ProgressSpinnerDialogService', () => {
  let service: ProgressSpinnerDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressSpinnerDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
