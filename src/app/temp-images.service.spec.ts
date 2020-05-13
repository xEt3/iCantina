import { TestBed } from '@angular/core/testing';

import { TempImagesService } from './temp-images.service';

describe('TempImagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TempImagesService = TestBed.get(TempImagesService);
    expect(service).toBeTruthy();
  });
});
