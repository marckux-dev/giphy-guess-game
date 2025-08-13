import { ComponentFixture, TestBed } from '@angular/core/testing';

import HomePage from './home-page';
import {provideZonelessChangeDetection} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Button} from '../../components/button/button';
import {provideRouter, Router} from '@angular/router';
import {routes} from '../../app.routes';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter(routes),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it ('should have the buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.directive(Button));
    const labels = buttons.map(item => (item.componentInstance as Button).label);
    expect(labels).toEqual(['1 Jugador', '2 Jugadores', 'Hall of Fame', 'Configuración']);
  });

  it('should navigate to settions-page on button click', () =>{
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    const btnDE = fixture.debugElement
      .query(By.css('app-button[label="Configuración"]'));
    expect(btnDE).toBeTruthy();
    const innerBtn = btnDE.nativeElement.querySelector('button');
    expect(innerBtn).toBeTruthy();
    innerBtn.click();
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith(['settings']);
  });

  it('should navigate to hall-of-fame-page on button click', () =>{
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    const btnDE = fixture.debugElement
      .query(By.css('app-button[label="Hall of Fame"]'));
    expect(btnDE).toBeTruthy();
    const innerBtn = btnDE.nativeElement.querySelector('button');
    expect(innerBtn).toBeTruthy();
    innerBtn.click();
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith(['hall-of-fame']);
  });

  it('should navigate to game-page with p=1 on "1 Jugador"', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    const btnDE = fixture.debugElement
      .query(By.css('app-button[label="1 Jugador"]'));
    expect(btnDE).toBeTruthy();

    const innerBtn: HTMLButtonElement = btnDE.nativeElement.querySelector('button');
    expect(innerBtn).toBeTruthy();

    innerBtn.click();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['game'], { queryParams: { p: 1 } });
  });

  it('should navigate to game-page with p=2 on "2 Jugadores"', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    const btnDE = fixture.debugElement
      .query(By.css('app-button[label="2 Jugadores"]'));
    expect(btnDE).toBeTruthy();

    const innerBtn: HTMLButtonElement = btnDE.nativeElement.querySelector('button');
    expect(innerBtn).toBeTruthy();

    innerBtn.click();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['game'], { queryParams: { p: 2 } });
  });
});
