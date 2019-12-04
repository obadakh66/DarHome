import { TestBed } from '@angular/core/testing';

import { SystemServicesService } from './system-services.service';

describe('SystemServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SystemServicesService = TestBed.get(SystemServicesService);
    expect(service).toBeTruthy();
  });
});
