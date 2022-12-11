const newLine = '\r\n';
const input = await Deno.readTextFile('./input.txt');

const sortedSumsOfCalories = input
  .split(`${newLine}${newLine}`)
  .map((row) =>
    row
      .split(newLine)
      .map(Number)
      .reduce((a, b) => a + b, 0)
  )
  .sort((a, b) => b - a);

const result1 = sortedSumsOfCalories[0];
const result2 = sortedSumsOfCalories.slice(0, 3).reduce((a, b) => a + b, 0);

console.log(result1);
console.log(result2);
