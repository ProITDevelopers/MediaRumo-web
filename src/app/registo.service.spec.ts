import { TestBed } from '@angular/core/testing';

import { RegistoService } from './registo.service';

describe('RegistoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistoService = TestBed.get(RegistoService);
    expect(service).toBeTruthy();
  });
});
