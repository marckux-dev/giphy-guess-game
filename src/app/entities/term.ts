import {hideTerm} from '../helpers/word-utils';

export class Term {

  private template: string;

  constructor(
    private readonly term: string,
  ) {
    this.template = hideTerm(this.term);
  }

  isRevealed(): boolean {
    return this.template.indexOf('_') === -1;
  }

  showRandomLetter(): string {
    if (this.isRevealed())
      throw new Error('No letter to show')
    return '';

  }






}
