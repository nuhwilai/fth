import { TestBed } from '@angular/core/testing';

import { RequestQrCodeService } from './request-qr-code.service';

describe('RequestQrCodeService', () => {
  let service: RequestQrCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestQrCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
