import { TestBed } from '@angular/core/testing';

import { PagedRestfulService } from './page-restful.service';

describe('PagedRestfulService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagedRestfulService = TestBed.get(PagedRestfulService);
    expect(service).toBeTruthy();
  });
});
