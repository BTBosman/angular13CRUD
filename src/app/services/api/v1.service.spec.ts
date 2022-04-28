import { TestBed } from '@angular/core/testing';

import { V1Service } from './v1.service';

describe('V1Service', () => {
  let service: V1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(V1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
