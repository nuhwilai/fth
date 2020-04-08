import { TestBed } from '@angular/core/testing';

import { QrScanService } from './qr-scan.service';

describe('QrScanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QrScanService = TestBed.get(QrScanService);
    expect(service).toBeTruthy();
  });
});
