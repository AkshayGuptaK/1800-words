import Trie from './trie';

describe('Trie', () => {
  it('should return false when checking contains for any string in empty trie', () => {
    const trie = new Trie();
    expect(trie.contains('string')).toBe(false);
  });
  it('should return false when checking contains for a string not in trie', () => {
    const trie = new Trie();
    trie.add('string');
    expect(trie.contains('differentString')).toBe(false);
  });
  it('should return true when checking contains for a string added to trie', () => {
    const trie = new Trie();
    trie.add('someOtherString');
    expect(trie.contains('someOtherString')).toBe(true);
  });
  it('should return an empty array when attempting to match against empty trie', () => {
    const trie = new Trie();
    expect(
      trie.matches([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
      ])
    ).toEqual([]);
  });
  it('should return an array with single string when there is only one matching string in trie', () => {
    const trie = new Trie();
    trie.add('beg');
    expect(
      trie.matches([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
      ])
    ).toEqual(['beg']);
  });
  it('should return an array with single string with hypenated words when that is the only match', () => {
    const trie = new Trie();
    trie.add('call');
    trie.add('us');
    expect(
      trie.matches([
        ['a', 'b', 'c'],
        ['a', 'b', 'c'],
        ['j', 'k', 'l'],
        ['j', 'k', 'l'],
        ['s', 't', 'u'],
        ['s', 't', 'u'],
      ])
    ).toEqual(['call-us']);
  });
  it('should return an array with all possible matches', () => {
    const trie = new Trie();
    trie.add('a');
    trie.add('able');
    trie.add('back');
    trie.add('balkus');
    trie.add('ball');
    trie.add('balls');
    trie.add('bc');
    trie.add('cal');
    trie.add('call');
    trie.add('calls');
    trie.add('clj');
    trie.add('jk');
    trie.add('just');
    trie.add('jut');
    trie.add('u');
    trie.add('us');
    expect(
      trie
        .matches([
          ['a', 'b', 'c'],
          ['a', 'b', 'c'],
          ['j', 'k', 'l'],
          ['j', 'k', 'l'],
          ['s', 't', 'u'],
          ['s', 't', 'u'],
        ])
        .sort()
    ).toEqual([
      'a-a-jk-u-u',
      'a-a-jk-us',
      'a-clj-u-u',
      'a-clj-us',
      'balkus',
      'ball-u-u',
      'ball-us',
      'balls-u',
      'bc-jk-u-u',
      'bc-jk-us',
      'cal-jut',
      'call-u-u',
      'call-us',
      'calls-u',
    ]);
  });
});
