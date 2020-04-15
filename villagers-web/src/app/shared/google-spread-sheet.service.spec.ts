import { TestBed } from '@angular/core/testing';

import { GoogleSpreadSheetService } from './google-spread-sheet.service';

describe('GoogleSpreadSheetService', () => {
  let service: GoogleSpreadSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleSpreadSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
