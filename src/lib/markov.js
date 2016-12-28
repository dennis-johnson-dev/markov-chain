// @flow

type generateOpts = {
  input: string;
  start: string;
}

export default class Markov {
  wordMap: Map<string>;

  constructor(inputText: string) {
    this.wordMap = this.buildIndex(inputText);
  }

  generate = (opts: generateOpts) => {
    let result = '';
    const totalWords = this.wordMap.size;
    const keys = this.wordMap.keys();
    const words = [];

    for (const word of keys) {
      words.push(word);
    }

    const startingIndex = function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }(0, totalWords);

    const startingWord = words[startingIndex];

    let currentWord = startingWord;
    result = result + currentWord;

    while (result.length < 80) {
      const currentWordConnections = this.wordMap.get(currentWord);
      const connections = currentWordConnections.get('connections');

      const total = Object.keys(connections).reduce((acc, val) => {
        return acc + connections[val].count;
      }, 0);

      if (!total) {
        break;
      }

      const list = Object.keys(connections);

      const weights = list.map((listItem) => {
        return connections[listItem].count / total;
      });

      const random_item = this.getRandomItem(list, weights);

      if (!random_item) {
        break;
      }

      currentWord = random_item;

      result = `${result} ${currentWord}`;
    }

    return result;
  }

  getRandomItem(list, weight) {
    const random_num = Math.random();
    let weight_sum = 0;

    for (let i in list) {
      weight_sum += weight[i];

      if (random_num <= weight_sum) {
        return list[i];
      }
    }
  };

  buildIndex(text: string) {
    const words = text.split(' ');
    const wordMap = new Map();

    words.forEach((word, idx) => {
      const nextWord = words[idx + 1];

      if (wordMap.has(word)) {
        const wordConnections = wordMap.get(word).get('connections');

        if (nextWord) {
          let existingCount = wordConnections[nextWord] && wordConnections[nextWord].count;
          if (existingCount) {
            existingCount++;
          }
          wordConnections[nextWord] = {
            count: existingCount || 1
          };

          wordMap.get(word).set('connections', wordConnections);
        }
      } else {
        let connection = {};

        if (nextWord) {
          connection = {
            [nextWord]: {
              count: 1
            }
          }
        }

        wordMap.set(word, new Map([["connections", connection]]));
      }
    });

    return wordMap;
  }
}
