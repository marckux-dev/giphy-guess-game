import {Component, computed, effect, inject, OnInit, signal} from '@angular/core';
import {GifFrame} from '../../components/gif-frame/gif-frame';
import {GameEngine} from '../../services/game-engine';
import {Word} from '../../components/word/word';
import {environment} from '../../../environments/environment';
import {Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-game-page',
  imports: [
    GifFrame,
    Word
  ],
  templateUrl: './game-page.html',
  styles: ``
})
export default class GamePage {
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
}
