// @flow

import Markov from '../markov';

test('builds data structure', () => {
  const inputText = 'foo bar foo baw foo bat foo bat barf';
  const markov = new Markov(inputText);

  const realText = markov.buildIndex(inputText);

  let foo = realText.get('foo');
  let fooConnections;

  if (foo) {
    fooConnections = foo.get('connections')

    if (fooConnections) {
      expect(Object.keys(fooConnections).length).toBe(3);
      expect(fooConnections.bar.count).toBe(1);
      expect(fooConnections.baw.count).toBe(1);
      expect(fooConnections.bat.count).toBe(2);
    }
  }

  let baw = realText.get('baw');
  let bawConnections;

  if (baw) {
    bawConnections = baw.get('connections');

    if (bawConnections) {
      expect(Object.keys(bawConnections).length).toBe(1);
      expect(bawConnections.foo.count).toBe(1);
    }
  }

  let bar = realText.get('bar');
  let barConnections;

  if (bar) {
    barConnections = bar.get('connections');

    if (barConnections) {
      expect(Object.keys(barConnections).length).toBe(1);
      expect(barConnections.foo.count).toBe(1);
    }
  }

  let bat = realText.get('bat');
  let batConnections;

  if (bat) {
    batConnections = bat.get('connections');

    if (batConnections) {
      expect(Object.keys(batConnections).length).toBe(2);
      expect(batConnections.foo.count).toBe(1);
      expect(batConnections.barf.count).toBe(1);
    }
  }
});

test('builds random string from existing string', () => {
  const inputText = 'the is the best. here';
  const markov = new Markov(inputText);

  const realText = markov.generate();

  expect(realText.split(' ').filter((item) => {
    return !inputText.includes(item);
  }).length).toBe(0);
});

test('builds random string from single word', () => {
  const inputText = 'foo';
  const markov = new Markov(inputText);

  const realText = markov.generate();
  expect(realText).toBe(inputText);
});
