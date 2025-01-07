import { TestBed } from '@angular/core/testing';

import { CalculatorResultService } from './calculator-result.service';

describe('CalculatorResultService', () => {
  let service: CalculatorResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
