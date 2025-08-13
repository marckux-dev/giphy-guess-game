import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MainFrame} from './components/main-frame/main-frame';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainFrame],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'giphy-guess-game';
}
