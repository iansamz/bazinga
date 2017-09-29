import { TestBed, inject } from '@angular/core/testing';

import { CatsService } from './cats.service';

describe('CatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatsService]
    });
  });

  it('should ...', inject([CatsService], (service: CatsService) => {
    expect(service).toBeTruthy();
  }));
});
