import {GiphyItem, GiphyResponse} from '../../interfaces/giphy-response';
import {Gif} from '../../interfaces/gif';

export class GifMapper {

  static giphyItemToGif(giphyItem: GiphyItem): Gif {
    return {
      id: giphyItem.id,
      title: giphyItem.title,
      url: giphyItem.images.original.url,
    };
  }

  static giphyResponseToGifs(giphyResponse: GiphyResponse): Gif[] {
    return giphyResponse.data.map(GifMapper.giphyItemToGif);
  }
}
