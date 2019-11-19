/**
 * Given a list of strings. For each string, return the shortest substring that only appears in that string
 *
 * Example:
 * Input: [ "palantir", "pelantors","cheapair", "cheapoair"]
 * Output:
 *   {
 *     "palantir": "ti" or "al", # only appears in "palantir"
 *     "pelantors": "s", # s only appears in "pelantors"
 *     "cheapair": "pai" or "apa", # either substring only appears in "cheapair"
 *     "cheapoair": "po" or "oa" # either substring only appears in cheapoair
 *   }
 */

interface RootNode {
  [char: string]: CharNode;
}

interface CharNode {
  children: RootNode;
  count: number;
}

interface SubStrings {
  [string: string]: string
}

function shortestSubString(strings: string[]): SubStrings {
  const root = createSubStringTree(strings);
  const shortestSubStringMapping: SubStrings = {};

  for (const currentString of strings) {
    for (let i = 0; i < currentString.length; i++) {
      let substring = '';
      let lastRoot = root;
      for (let j = i; j < currentString.length; j++) {
        const char = currentString[j];
        substring += char;
        const node = lastRoot[char];
        if (shortestSubStringMapping[currentString] &&
           shortestSubStringMapping[currentString].length <= substring.length) {
          break;
        }
        if (node.count === 1) {
          shortestSubStringMapping[currentString] = substring;
          break;
        }
        lastRoot = node.children;
      }
    }
  }

  return shortestSubStringMapping;
}

function createSubStringTree(strings: string[]): RootNode {
  const root: RootNode = {};

  for (const string of strings) {
    for (let i = 0; i < string.length; i++) {
      createSubStringBranch(root, string, i);
    }
  }

  return root;
}

function createSubStringBranch(root: RootNode, string: string, startIndex: number): void {
  let lastRoot = root;
  for (let i = startIndex; i < string.length; i++) {
    const char = string[i];
    if (lastRoot[char] === undefined) {
      lastRoot[char] = { children: {}, count: 0 };
    }
    lastRoot[char].count++;
    lastRoot = lastRoot[char].children;
  }
}

test('shortestSubString -- example from challenge', () => {
  const strings = ['palantir', 'pelantors', 'cheapair', 'cheapoair'];
  const expected = {
    palantir: 'al',
    pelantors: 's',
    cheapair: 'apa',
    cheapoair: 'po'
  };
  expect(shortestSubString(strings)).toEqual(expected);
});
