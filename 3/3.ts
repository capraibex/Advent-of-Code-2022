const newLine = '\r\n';
const input = await Deno.readTextFile('./input.txt');
const alpha = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const result1 = input
  .split(newLine)
  .filter(Boolean)
  .reduce((acc, curr) => {
    const [first, second] = [curr.slice(0, curr.length / 2), curr.slice(-curr.length / 2)];
    const common = [...first].find((c) => second.includes(c))!;
    return acc + alpha.indexOf(common);
  }, 0);

const result2 = input
  .match(/(.*\r\n){3}/g)
  ?.map((thress) => thress.split(newLine).filter(Boolean))
  .reduce((acc, [first, second, third]) => {
    const common = [...first].filter((c) => second.includes(c)).find((c) => third.includes(c))!;
    return acc + alpha.indexOf(common);
  }, 0);

console.log(result1);
console.log(result2);
