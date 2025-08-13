import {inject, Injectable} from '@angular/core';
import {Observable, map} from 'rxjs';
import {Gif} from '../interfaces/gif';
import {HttpClient} from '@angular/common/http';
import {GiphyResponse} from '../interfaces/giphy-response';
import {environment} from '../../environments/environment';
import {GifMapper} from './mappers/gif-mapper';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  private http = inject(HttpClient);

  getGifsByTerm(term: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.apiUrl}/gifs/search`, {
      params: {
        api_key: environment.apiKey,
        q: term,
        limit: environment.limit,
      }
    }).pipe(
      map(GifMapper.ghiphyResponseToGifs),
    );
  }
}
