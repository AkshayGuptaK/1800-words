import { readFile } from './reader';
import { mapNumberToCharSet } from './letter-mapping';
import { promptNumber } from './prompt';
import Trie from './trie';

const trie = new Trie();

async function run() {
  while (true) {
    const { phoneNumber } = await promptNumber();
    const matches = trie.matches(mapNumberToCharSet(phoneNumber));
    console.log(matches);
  }
}

function processLine(word: string) {
  if (word.length > 1) trie.add(word.toUpperCase());
}

readFile('/usr/share/dict/words', console.error, processLine, run);
// change to cmd line script and take dictionary path and number of unchanged digits permitted as options
