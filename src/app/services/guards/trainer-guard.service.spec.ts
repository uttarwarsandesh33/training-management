import { TestBed } from '@angular/core/testing';

import { TrainerGuardService } from './trainer-guard.service';

describe('TrainerGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainerGuardService = TestBed.get(TrainerGuardService);
    expect(service).toBeTruthy();
  });
});
