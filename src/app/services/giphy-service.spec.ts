import { TestBed } from '@angular/core/testing';
import { GiphyService } from './giphy-service';
import {HttpClientTestingModule, HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {importProvidersFrom, provideZonelessChangeDetection} from '@angular/core';
import {environment} from '../../environments/environment';
import {Gif} from '../interfaces/gif';

describe('GiphyService', () => {
  let service: GiphyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        importProvidersFrom(HttpClientTestingModule),
        // provideHttpClientTesting(),
        GiphyService,
        provideZonelessChangeDetection(),
      ]
    });
    service = TestBed.inject(GiphyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build a correct search URL with a given term and apiKey', () =>{
    const term = 'cat';
    const expectedUrl = `${environment.apiUrl}/gifs/search?api_key=${environment.apiKey}&q=${term}&limit=${environment.limit}`;
    service.getGifsByTerm(term).subscribe();
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush({data:[]});
  });

  it('should fetch and return a list of gifs by term ', () => {
    const term = 'dog';
    const mockResponse = {
      data: [
        {
          id    : 'abc123',
          title : 'Dog Smile GIF by MOODMAN',
          images: {
            original: {
              url: 'https://media2.giphy.com/media/Fu3OjBQiCs3s0ZuLY3/giphy.gif?cid=83639b59jils8shnmaidkjwofd373x4l7t57sa1r42nsqnpn&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            }
          },
        },
        {
          id    : 'abc124',
          title : 'Dog Smile GIF by MOODMAN',
          images: {
            original: {
              url: 'https://media2.giphy.com/media/Fu3OjBQiCs3s0ZuLY3/giphy.gif?cid=83639b59jils8shnmaidkjwofd373x4l7t57sa1r42nsqnpn&ep=v1_gifs_search&rid=giphy.gif&ct=g',
            }
          },
        }
      ]
    };
    let gifs: Gif[] = [];
    service.getGifsByTerm(term).subscribe(result => gifs = result);
    const req = httpMock.expectOne(() => true);
    req.flush(mockResponse);

    expect(gifs.length).toEqual(2);
    expect(gifs[0].id).toEqual('abc123');
  });


});
