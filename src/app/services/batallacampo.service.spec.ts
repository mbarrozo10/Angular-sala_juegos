import { TestBed } from '@angular/core/testing';

import { BatallacampoService } from './batallacampo.service';

describe('BatallacampoService', () => {
  let service: BatallacampoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatallacampoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
