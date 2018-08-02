import { TestBed, inject } from '@angular/core/testing';

import { TaskyService } from './tasky.service';

describe('TaskyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskyService]
    });
  });

  it('should be created', inject([TaskyService], (service: TaskyService) => {
    expect(service).toBeTruthy();
  }));
});
