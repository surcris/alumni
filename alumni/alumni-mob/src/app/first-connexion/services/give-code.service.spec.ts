import { TestBed } from '@angular/core/testing';

import { GiveCodeService } from './give-code.service';

describe('GiveCodeService', () => {
  let service: GiveCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiveCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
