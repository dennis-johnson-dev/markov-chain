// @flow

type generateOpts = {
  input: string;
  start: string;
}

export default class Markov {
  wordMap: Map<string, Map<string, Object>>;

  constructor(inputText: string) {
    this.wordMap = this.buildIndex(inputText);
  }

  getRandomIntegerInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
  };

  generate = () => {
    let result: string = '';
    const totalWords: number = this.wordMap.size;
    const keys = this.wordMap.keys();
    const words: string[] = [];

    for (const word of keys) {
      words.push(word);
    }

    const startingIndex: number = this.getRandomIntegerInclusive(0, totalWords);
    const startingWord: string = words[startingIndex];

    let currentWord: string = startingWord;
    result = currentWord;

    while (result.length < 80) {
      const currentWordMap = this.wordMap.get(currentWord);
      if (!currentWordMap) {
        break;
      }

      let connections = currentWordMap.get('connections') || {};
      if (!connections) {
        break;
      }

      let edges = Object.keys(connections) || [];
      if (!edges.length) {
        break;
      }

      const total = edges.reduce((acc, edge) => {
        if (connections[edge]) {
          return acc + connections[edge].count;
        }

        return acc;
      }, 0);

      const weights = edges.map(edgesItem => connections[edgesItem].count / total);

      currentWord = this.getRandomConnection(edges, weights);

      result = `${result} ${currentWord}`;
    }

    return result;
  }

  getRandomConnection(edges: string[], weights: number[]): string {
    if (!edges) {
      return '';
    }

    if (!edges.length) {
      return '';
    }

    const random_num = Math.random();
    let weight_sum: number = 0;

    let edge = '';

    for (let edgeIndex = 0; edgeIndex < edges.length; edgeIndex++) {
      weight_sum += weights[edgeIndex];

      if (random_num <= weight_sum) {
        edge = edges[edgeIndex];
        break;
      }
    }

    return edge;
  };

  buildIndex(text: string) {
    const words = text.split(' ');
    const wordMap = new Map();

    words.forEach((word, idx) => {
      const nextWord = words[idx + 1];

      if (wordMap.has(word)) {
        const wordMaps = wordMap.get(word);
        if (!wordMaps) {
          return;
        }
        const wordConnections = wordMaps.get('connections');
        if (!wordConnections) {
          return;
        }

        if (nextWord) {
          let count = wordConnections[nextWord] && wordConnections[nextWord].count || 0;

          wordConnections[nextWord] = { count: count + 1 };

          const wordMaps = wordMap.get(word);
          if (wordMaps) {
            wordMaps.set('connections', wordConnections);
          }
        }
      } else {
        let wordConnections = {};

        if (nextWord) {
          wordConnections[nextWord] = { count: 1 };
        }

        wordMap.set(word, new Map([["connections", wordConnections]]));
      }
    });

    return wordMap;
  }
}
