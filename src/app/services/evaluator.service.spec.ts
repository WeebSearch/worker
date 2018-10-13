import { TestBed } from '@angular/core/testing';

import { EvaluatorService } from './evaluator.service';

describe('EvaluatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvaluatorService = TestBed.get(EvaluatorService);
    expect(service).toBeTruthy();
  });
});
