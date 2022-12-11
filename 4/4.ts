const newLine = '\r\n';
const input = await Deno.readTextFile('./input.txt');

const [result1, result2] = input
  .split(newLine)
  .map((row) => row.split(',').map((range) => range.split('-').map(Number)))
  .reduce(
    ([acc1, acc2], [[l1, l2], [h1, h2]]) => [
      acc1 +
        Number(
          (h1 >= l1 && h1 <= l2 && h2 >= l1 && h2 <= l2) ||
            (l1 >= h1 && l1 <= h2 && l2 >= h1 && l2 <= h2)
        ),
      acc2 +
        Number(
          (h1 >= l1 && h1 <= l2) ||
            (h2 >= l1 && h2 <= l2) ||
            (l1 >= h1 && l1 <= h2) ||
            (l2 >= h1 && l2 <= h2)
        ),
    ],
    [0, 0]
  );

console.log(result1);
console.log(result2);
