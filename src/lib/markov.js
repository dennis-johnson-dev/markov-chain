// @flow

type generateOpts = {
  input: string;
  start: string;
}

export default class Markov {
  sourceText: string;

  constructor(inputText: string) {
    this.sourceText = inputText;
  }

  generate = (opts: generateOpts) => {
    console.log(this.sourceText);
  }
}
