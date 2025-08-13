import {Component, inject} from '@angular/core';
import {Button} from '../../components/button/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [
    Button
  ],
  templateUrl: './home-page.html',
  styles: ``
})
export default class HomePage {

  router = inject(Router);

  goTo(path: string) {
    this.router.navigate([path]).then(() => {});
  }

  goToGame(p: 1 | 2) {
    this.router.navigate(['game'], { queryParams: {p} });
  }




}
