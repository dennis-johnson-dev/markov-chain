// @flow

import Markov from '../markov';

test('generates random text', () => {
  const inputText = 'foo bar baw';
  const markov = new Markov(inputText);

  const nextState = 'bar baw';

  const realText = markov.generate({ start: 'bar', input: inputText});

  expect(realText).toEqual(nextState);
});
