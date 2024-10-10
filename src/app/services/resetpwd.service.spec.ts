import { TestBed } from '@angular/core/testing';

import { ResetpwdService } from './resetpwd.service';

describe('ResetpwdService', () => {
  let service: ResetpwdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetpwdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
