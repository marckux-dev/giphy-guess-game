import {Component, inject} from '@angular/core';
import {GifFrame} from '../../components/gif-frame/gif-frame';
import {GameEngine} from '../../services/game-engine';
import {Word} from '../../components/word/word';

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
  gameEngine = inject(GameEngine);

}
