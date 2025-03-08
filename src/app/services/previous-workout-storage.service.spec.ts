import { TestBed } from '@angular/core/testing';

import { PreviousWorkoutStorageService } from './previous-workout-storage.service';

describe('PreviousWorkoutStorageService', () => {
  let service: PreviousWorkoutStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviousWorkoutStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
