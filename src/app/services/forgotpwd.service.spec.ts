import { TestBed } from '@angular/core/testing';

import { ForgotpwdService } from './forgotpwd.service';

describe('ForgotpwdService', () => {
  let service: ForgotpwdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotpwdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
