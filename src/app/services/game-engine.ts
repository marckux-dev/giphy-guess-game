import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {WordService} from './word-service';
import {Gif} from '../interfaces/gif';
import {GiphyService} from './giphy-service';
import {shuffleArray} from '../helpers/array-utils';
import {hideTerm, isAlphabetic, revealRandomLetter} from '../helpers/word-utils';

@Injectable({
  providedIn: 'root'
})
export class GameEngine {

  wordServer = inject(WordService);
  giphyServer = inject(GiphyService);

  currentTerm = signal<string>(this.wordServer.serveWord());
  currentTemplate = signal<string>(hideTerm(this.currentTerm()));
  currentGifs = signal<Gif[]>([]);


  private guardTerm = effect(() => {
    const term = this.currentTerm();
    if (term) {
      this.currentTemplate.set(hideTerm(term));
      this.giphyServer.getGifsByTerm(term).subscribe(gifs => {
        this.currentGifs.set(shuffleArray(gifs));
      });
    }
  });

  newWord = () => {
    this.currentTerm.set(this.wordServer.serveWord());
  }

  checkTerm = (term: string) =>
    term.trim().toLowerCase() === this.currentTerm().trim().toLowerCase();

  revealRandomLetter = () => {
    this.currentTemplate.update( template => revealRandomLetter(this.currentTerm(), template));
  }

  revealWithGuess = (guess: string) => {
    const term = this.currentTerm();
    let lowerCaseGuess = guess.trim().toLowerCase();
    if (term.startsWith(lowerCaseGuess)) {
      const rest = term.slice(guess.length);
      for (const letter of rest) {
        if (!isAlphabetic(letter)) {
          lowerCaseGuess += letter;
        } else {
          break;
        }
      }
      this.currentTemplate.update(template => lowerCaseGuess + template.slice(lowerCaseGuess.length));
      return lowerCaseGuess;
    } else {
      return '';
    }
  }

}
