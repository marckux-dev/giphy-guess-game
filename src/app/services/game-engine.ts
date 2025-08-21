import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {WordService} from './word-service';
import {Gif} from '../interfaces/gif';
import {GiphyService} from './giphy-service';
import {interval, merge, mergeAll, startWith, Subject, takeUntil, tap} from 'rxjs';
import {environment} from '../../environments/environment';
import {shuffleArray} from '../helpers/array-utils';
import {hideTerm, revealRandomLetter} from '../helpers/word-utils';

@Injectable({
  providedIn: 'root'
})
export class GameEngine {

  wordServer = inject(WordService);
  giphyServer = inject(GiphyService);

  currentTerm = signal<string>(
    this.wordServer.serveWord()
  );

  currentTemplate = signal<string>(hideTerm(this.currentTerm()));

  currentGifs = signal<Gif[]>([]);

  isRevealed = computed(() => this.checkTerm(this.currentTemplate()));

  private guardTerm = effect(() => {
    const term = this.currentTerm();
    if (term) {
      this.giphyServer.getGifsByTerm(term).subscribe(gifs => {
        this.currentGifs.set(shuffleArray(gifs));
      });
    }
  });

  checkTerm = (term: string) =>
    term.trim().toLowerCase() === this.currentTerm().trim().toLowerCase();

  revealRandomLetter = () => {
    this.currentTemplate.update( template => revealRandomLetter(this.currentTerm(), template));
  }





}
