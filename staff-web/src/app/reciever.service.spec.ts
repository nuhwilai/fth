import { TestBed } from '@angular/core/testing';

import { RecieverService } from './reciever.service';

describe('RecieverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecieverService = TestBed.get(RecieverService);
    expect(service).toBeTruthy();
  });
});
