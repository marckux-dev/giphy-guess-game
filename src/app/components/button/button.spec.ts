import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Button } from './button';
import {provideZonelessChangeDetection} from '@angular/core';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
      providers: [
        provideZonelessChangeDetection()
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should execute a given function on click", () => {
    const mockFunction = jasmine.createSpy('mockFunction');
    component.onClick.subscribe(mockFunction);
    fixture.detectChanges();

    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();

    expect(mockFunction).toHaveBeenCalled();
  })
});
