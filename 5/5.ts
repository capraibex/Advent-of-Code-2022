const newLine = '\r\n';
const input = await Deno.readTextFile('./input.txt');

// [N] [G]                     [Q]
// [H] [B]         [B] [R]     [H]
// [S] [N]     [Q] [M] [T]     [Z]
// [J] [T]     [R] [V] [H]     [R] [S]
// [F] [Q]     [W] [T] [V] [J] [V] [M]
// [W] [P] [V] [S] [F] [B] [Q] [J] [H]
// [T] [R] [Q] [B] [D] [D] [B] [N] [N]
// [D] [H] [L] [N] [N] [M] [D] [D] [B]
//  1   2   3   4   5   6   7   8   9

function solve(part: number) {
  const crates: { [key: number]: string[] } = {
    1: ['D', 'T', 'W', 'F', 'J', 'S', 'H', 'N'],
    2: ['H', 'R', 'P', 'Q', 'T', 'N', 'B', 'G'],
    3: ['L', 'Q', 'V'],
    4: ['N', 'B', 'S', 'W', 'R', 'Q'],
    5: ['N', 'D', 'F', 'T', 'V', 'M', 'B'],
    6: ['M', 'D', 'B', 'V', 'H', 'T', 'R'],
    7: ['D', 'B', 'Q', 'J'],
    8: ['D', 'N', 'J', 'V', 'R', 'Z', 'H', 'Q'],
    9: ['B', 'N', 'H', 'M', 'S'],
  };

  input
    .split(newLine)
    .map((row) => row.match(/\d+/g)!.map(Number))
    .forEach(([amount, from, to]) => {
      const cratesToMove = crates[from].splice(-amount);
      if (part === 1) {
        cratesToMove.reverse();
      }
      crates[to].push(...cratesToMove);
    });

  const result = Object.values(crates)
    .map((c) => c.pop())
    .join('');

  console.log(result);
}

solve(1);
solve(2);
