import { TestBed } from '@angular/core/testing';

import { SharedSubjectService } from './shared-subject.service';

describe('SharedSubjectService', () => {
  let service: SharedSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
