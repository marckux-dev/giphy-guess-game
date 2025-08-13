import { TestBed } from '@angular/core/testing';
import { CacheService } from './cache-service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()] // 👈 zoneless en este spec
    });
    service = TestBed.inject(CacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

