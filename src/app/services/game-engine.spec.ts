import { TestBed } from '@angular/core/testing';
import { GameEngine } from './game-engine';
import { provideZonelessChangeDetection } from '@angular/core';

describe('GameEngine', () => {
  let service: GameEngine;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()] // 👈 zoneless aquí también
    });
    service = TestBed.inject(GameEngine);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});

