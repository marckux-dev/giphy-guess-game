import { Injectable } from '@angular/core';
import {Gif} from '../interfaces/gif';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  loadCache(): void {
    throw new Error('Method not implemented.');
  }

  getGifsByTerm(term: string): string[] {
    throw new Error('Method not implemented.');
  }

  setGifsByTerm(term: string, gifs: Gif[]): void {
    throw new Error('Method not implemented.');
  }


}
