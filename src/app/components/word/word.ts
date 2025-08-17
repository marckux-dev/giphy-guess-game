import {Component, computed, input} from '@angular/core';
import {UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-word',
  imports: [
    UpperCasePipe
  ],
  templateUrl: './word.html',
  styles: ``
})
export class Word {
  text = input.required<string>();
  textLetters = computed(() => Array.from(this.text()));
}
