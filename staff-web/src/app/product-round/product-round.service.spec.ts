import { TestBed } from '@angular/core/testing';

import { ProductRoundService } from './product-round.service';

describe('ProductRoundService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductRoundService = TestBed.get(ProductRoundService);
    expect(service).toBeTruthy();
  });
});
