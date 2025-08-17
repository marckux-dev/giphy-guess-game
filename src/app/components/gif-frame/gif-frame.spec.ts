import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifFrame } from './gif-frame';

describe('GifFrame', () => {
  let component: GifFrame;
  let fixture: ComponentFixture<GifFrame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GifFrame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GifFrame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
