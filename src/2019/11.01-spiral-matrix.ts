/**
 * Given a positive integer n, generate a square matrix filled with elements from 1 to n^2 in spiral order.
 * 
 * Example:
 * Input: 3
 * Output: [
 *  [1,2,3],
 *  [8,9,4],
 *  [7,6,5]
 * ]
 */

function spiralize(n: number): number[][] {
  const matrix = createEmptyMatrix(n);

  let path: 'r'|'c' = 'r';
  let direction: 1|-1 = 1;
  let row = 0;
  let column = 0;

  for (let i = 1; i <= n*n; i++) {
    matrix[row][column] = i;

    if (path === 'r') {
      if (matrix[row][column + direction] !== null) {
        path = 'c';
        row += direction;
      } else {
        column += direction;
      }
    } else {
      const rowArray = matrix[row + direction];
      if (!rowArray || rowArray[column] !== null) {
        path = 'r';
        direction *= -1;
        column += direction;
      } else {
        row += direction;
      }
    }
    
  }

  return matrix;
}

function createEmptyMatrix(n: number): number[][] {
  const matrix = [];
  for (let i = 0; i < n; i++) {
    const row = <number[]>Array.from({ length: n }).fill(null);
    matrix.push(row);
  }
  return matrix;
}

test('n == 1', () => {
  const n = 1;
  const expected = [[1]];
  expect(spiralize(n)).toEqual(expected);
});

test('n == 2', () => {
  const n = 2;
  const expected = [
    [1, 2],
    [4, 3]
  ];
  expect(spiralize(n)).toEqual(expected);
});

test('n == 3', () => {
  const n = 3;
  const expected = [
    [1, 2, 3],
    [8, 9, 4],
    [7, 6, 5]
  ];
  expect(spiralize(n)).toEqual(expected);
});

test('n == 4', () => {
  const n = 4;
  const expected = [
    [ 1,  2,  3, 4],
    [12, 13, 14, 5],
    [11, 16, 15, 6],
    [10,  9,  8, 7]
  ];
  expect(spiralize(n)).toEqual(expected);
});

test('n == 4', () => {
  const n = 5;
  const expected = [
    [ 1, 2, 3, 4, 5],
    [16,17,18,19, 6],
    [15,24,25,20, 7],
    [14,23,22,21, 8],
    [13,12,11,10, 9]
  ];
  expect(spiralize(n)).toEqual(expected);
});
