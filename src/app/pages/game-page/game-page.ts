import {Component, computed, effect, HostListener, inject, OnDestroy, signal} from '@angular/core';
import {GifFrame} from '../../components/gif-frame/gif-frame';
import {GameEngine} from '../../services/game-engine';
import {Word} from '../../components/word/word';
import {environment} from '../../../environments/environment';
import {Subscription, timer} from 'rxjs';
import {isAlphabetic} from '../../helpers/word-utils';

@Component({
  selector: 'app-game-page',
  imports: [
    GifFrame,
    Word
  ],
  templateUrl: './game-page.html',
  styles: ``
})
export default class GamePage implements OnDestroy {
  private gameEngine = inject(GameEngine);
  private gifs = computed(() => this.gameEngine.currentGifs());

  private index = signal<number>(0);
  private readonly period = environment.timeBetweenGifs;
  private readonly chunkSize = environment.numberOfGifsBetweenTips;
  private tick?: Subscription;

  currentGif = computed(() => {
    const list = this.gifs();
    const i = this.index();
    if (list.length === 0) return null;
    return list[i % list.length]?? null;
  });

  currentTemplate = computed(() => this.gameEngine.currentTemplate() );
  guess = signal<string>('');
  badGuess = signal<boolean>(false);
  goodGuess = computed(() => this.gameEngine.checkTerm(this.guess()));
  blockKeyboardInput = signal<boolean>(false);

  constructor() {
    effect(() => {
      const list = this.gifs();
      this.index.set(0);
      this.startTimer(list.length > 0);
    });
  }

  private startTimer(hasGifs: boolean) {
    this.stopTimer();
    if (!hasGifs) return;
    this.tick = timer(0, this.period).subscribe(() => {
      this.index.update(i => i + 1);
      if (this.index() % this.chunkSize === 0) {
        this.gameEngine.revealRandomLetter();
      }
    })
  }

  private stopTimer() {
    this.tick?.unsubscribe();
    this.tick = undefined;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.blockKeyboardInput()) return;
    const key = event.key;
    if (key.length !== 1 || !isAlphabetic(key)) return;
    const provisionalGuess = this.guess() + key;
    const revealed = this.gameEngine.revealWithGuess(provisionalGuess);
    if (!revealed) {
      this.guess.set(provisionalGuess);
      this.badGuess.set(true);
      this.blockKeyboardInput.set(true);
      setTimeout(() => {
        this.guess.set('');
        this.badGuess.set(false);
        this.blockKeyboardInput.set(false);
      }, 500);
    } else {
      this.guess.update(guess => this.gameEngine.revealWithGuess(guess + key));
      if (this.goodGuess()) {
        this.stopTimer();
        this.blockKeyboardInput.set(true);
        setTimeout(() => {
          this.guess.set('');
          this.blockKeyboardInput.set(false);
          this.gameEngine.newWord();
        }, 1000);
      }

    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }



}
