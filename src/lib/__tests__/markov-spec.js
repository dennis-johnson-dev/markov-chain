// @flow

import Markov from '../markov';

test('builds data structure', () => {
  const inputText = 'foo bar foo baw foo bat foo bat barf';
  const markov = new Markov(inputText);

  const realText = markov.buildIndex(inputText);

  const foo = realText.get('foo').get('connections');
  expect(Object.keys(foo).length).toBe(3);
  expect(foo.bar.count).toBe(1);
  expect(foo.baw.count).toBe(1);
  expect(foo.bat.count).toBe(2);

  const baw = realText.get('baw').get('connections');
  expect(Object.keys(baw).length).toBe(1);
  expect(baw.foo.count).toBe(1);

  const bar = realText.get('bar').get('connections');
  expect(Object.keys(bar).length).toBe(1);
  expect(bar.foo.count).toBe(1);

  const bat = realText.get('bat').get('connections');
  expect(Object.keys(bat).length).toBe(2);
  expect(bat.foo.count).toBe(1);
  expect(bat.barf.count).toBe(1);
});

test('builds random string from existing string', () => {
  const inputText = 'the poop the poop but recognized a clear subsequent shift in power among levels of stratification due to the status and power differentials Analyzing the entire edit history of Wikipedia up to July 2006, the same study determined that the influence of administrator edits on contents has steadily diminished since 2003, when administrators performed roughly 50% of total edits, to 2006 when only 10% of the edits were performed by administrators. This happened despite the fact that the average number of edits per administrator had increased more than fivefold during the same period. This phenomenon was labeled the rise of the crowd by the authors of the paper. An analysis that used as metric the number of words edited instead of the number of edit actions showed a similar pattern. Because the admin class is somewhat arbitrary with respect to the number of edits, the study also considered a breakdown of users in categories based on the number of edits performed. The results for elite users, i.e. users with more than 10,000 edits, were somewhat in line with those obtained for administrators, except that the number of words changed by elite users has kept up with the changes made by novice users, even though the number of edits made by novice users has grown proportionally faster. The elite users were attributed about 30% of the changes for 2006. The study concludes';
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
