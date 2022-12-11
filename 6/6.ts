const input = await Deno.readTextFile('./input.txt');

function solve(part: number) {
  const charLength = part === 1 ? 4 : 14;

  for (let i = charLength; i < input.length; i++) {
    if (new Set(input.slice(i - charLength, i)).size === charLength) {
      console.log(i);
      break;
    }
  }
}

solve(1);
solve(2);
