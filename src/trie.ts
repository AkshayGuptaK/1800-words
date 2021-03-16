/**
 * Trie data structure matching both exact strings or a sequence of character choices
 * @remarks A tree where each node (except root) represents a character.
 * Children represent the possible next characters in a contained string from the current character.
 * Can insert strings and verify if a given string is contained in O(N*L) time, where L is average string length.
 * Can also returns all contained strings which match a sequence of possible characters.
 */
export default class Trie {
  private root;

  constructor() {
    this.root = new Node();
  }

  /**
   * Inserts a string key into the trie
   * @param key - non-empty string to be added
   */
  add(key: string | null): void {
    if (key == null || key.length < 1) return;
    let curr = this.root;
    let next = null;

    for (const ch of key) {
      next = curr.getLink(ch);
      if (next == null) {
        next = new Node();
        curr.addLink(ch, next);
      }
      curr = next;
    }
    curr.isKey = true;
  }

  /**
   * Checks whether a given string is contained in the trie
   * @param key - queried string
   * @returns true or false
   */
  contains(key: string): boolean {
    if (key == null || key.length < 1) return false;
    let curr = this.root;
    let next = null;

    for (const ch of key) {
      next = curr.getLink(ch);
      if (next == null) {
        return false;
      }
      curr = next;
    }
    return curr.isKey;
  }

  /**
   * Returns all contained strings which match a sequence of possible characters
   * @param chars - a sequence of sequences, the latter contains
   * @returns sequence of matching strings, ordered alphabetically
   * @example [['a', 'b'], ['e', 't']] -\> ['at', 'be']
   */
  matches(chars: string[][]): string[] {
    return this.matchHelper('', chars, this.root);
  }

  private matchHelper(
    stringSoFar: string,
    chars: string[][],
    node: Node
  ): string[] {
    if (chars.length == 0) {
      return node.isKey ? [stringSoFar] : [];
    }
    const [first, ...rest] = chars;
    return first
      .map((char) => {
        let results: string[] = [];
        const child = node.getLink(char);
        if (!child) return results;
        if (child.isKey && rest.length)
          results = results.concat(
            this.matchHelper(stringSoFar.concat(char, '-'), rest, this.root)
          );
        results = results.concat(
          this.matchHelper(stringSoFar.concat(char), rest, child)
        );
        return results;
      })
      .reduce((a, b) => a.concat(b), []);
  }
}

class Node {
  public isKey = false;
  private links: Record<string, Node>;

  constructor() {
    this.links = {};
  }

  getLink(s: string): Node {
    return this.links[s];
  }

  addLink(key: string, val: Node): void {
    this.links[key] = val;
  }
}
