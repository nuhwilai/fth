import { TestBed } from '@angular/core/testing';

import { BackgroundSyncService } from './background-sync.service';

describe('BackgroundSyncService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackgroundSyncService = TestBed.get(BackgroundSyncService);
    expect(service).toBeTruthy();
  });
});
