import {Component, inject} from '@angular/core';
import {GameEngine} from '../../services/game-engine';

@Component({
  selector: 'app-gif-frame',
  imports: [],
  templateUrl: './gif-frame.html',
  styles: ``
})
export class GifFrame {

  gameEngine = inject(GameEngine);

}
