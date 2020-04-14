import { TestBed } from '@angular/core/testing';

import { ReceiveTxnService } from './receive-txn.service';

describe('ReceiveTxnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReceiveTxnService = TestBed.get(ReceiveTxnService);
    expect(service).toBeTruthy();
  });
});
