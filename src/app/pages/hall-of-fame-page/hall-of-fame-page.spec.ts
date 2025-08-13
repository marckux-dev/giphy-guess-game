import { ComponentFixture, TestBed } from '@angular/core/testing';

import HallOfFamePage from './hall-of-fame-page';
import {provideZonelessChangeDetection} from '@angular/core';

describe('HallOfFamePage', () => {
  let component: HallOfFamePage;
  let fixture: ComponentFixture<HallOfFamePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HallOfFamePage],
      providers: [
        provideZonelessChangeDetection()
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallOfFamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
