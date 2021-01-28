export default class Trie {
  private root;

  constructor() {
    this.root = new Node();
  }

  add(key: string | null): void {
    if (key == null || key.length < 1) return;
    let curr = this.root;
    let next = null;

    for (let ch of key) {
      next = curr.getLink(ch);
      if (next == null) {
        next = new Node();
        curr.addLink(ch, next);
      }
      curr = next;
    }
    curr.isKey = true;
  }

  contains(key: string): boolean {
    if (key == null || key.length < 1) return false;
    let curr = this.root;
    let next = null;

    for (let ch of key) {
      next = curr.getLink(ch);
      if (next == null) {
        return false;
      }
      curr = next;
    }
    return curr.isKey;
  }

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
        let child = node.getLink(char);
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

/*
public class MyTrieSet implements TrieSet61B {
  private class Node {
    public Set<Character> getChildren() { return links.keySet(); }
  }

  @Override
  public boolean contains(String key) {
    if (key == null || key.length() < 1)
      return false;

    char[] keyChars = key.toCharArray();
    Node curr = root;
    Node next = null;

    for (Character ch : keyChars) {
      next = curr.getLink(ch);
      if (next == null) {
        return false;
      }
      curr = next;
    }
    return curr.isKey();
  }

  private List<String> allKeysFromNode(String prefix, Node node) {
    List<String> results = new ArrayList<String>();
    if (node.isKey())
      results.add(prefix);
    for (Character ch : node.getChildren()) {
      results.addAll(allKeysFromNode(prefix + ch, node.getLink(ch)));
    }
    return results;
  }

  @Override
  public List<String> keysWithPrefix(String prefix) {
    List<String> results = new ArrayList<String>();
    if (prefix == null)
      return results;
    char[] prefixChars = prefix.toCharArray();
    Node curr = root;
    Node next = null;

    for (Character ch : prefixChars) {
      next = curr.getLink(ch);
      if (next == null) {
        return results;
      }
      curr = next;
    }
    return allKeysFromNode(prefix, curr);
  }
}
*/
