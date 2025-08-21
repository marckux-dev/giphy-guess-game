import {Component, input} from '@angular/core';
import {Gif} from '../../interfaces/gif';

@Component({
  selector: 'app-gif-frame',
  imports: [],
  templateUrl: './gif-frame.html',
  styles: ``
})
export class GifFrame  {
  gif = input.required<Gif|null>();
}
