import {inject, Injectable, signal} from '@angular/core';
import {WordService} from './word-service';

@Injectable({
  providedIn: 'root'
})
export class GameEngine {

  wordServer = inject(WordService);

  currentTerm = signal<string>(
    this.wordServer.serveWord()
  );


}
