const newLine = '\r\n';
const input = await Deno.readTextFile('./input.txt');

const rpsScore: { [key: string]: number } = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};
const rScore: { [key: string]: number } = {
  X: 0,
  Y: 3,
  Z: 6,
};

function getScore(opp: number, me: number): number {
  if (opp === me) {
    return opp + 3;
  }
  if (opp === 1) {
    return me + (me === 2 ? 6 : 0);
  }
  if (opp === 2) {
    return me + (me === 3 ? 6 : 0);
  }
  return me + (me === 1 ? 6 : 0);
}

function getScore2(opp: number, res: number): number {
  if (res === 0) {
    return res + (opp === 1 ? 3 : opp === 2 ? 1 : 2);
  }
  if (res === 3) {
    return res + opp;
  }
  return res + (opp === 1 ? 2 : opp === 2 ? 3 : 1);
}

const result1 = input
  .split(newLine)
  .map((row) => row.split(' ').map((c) => rpsScore[c]))
  .reduce((acc, [o, m]) => acc + getScore(o, m), 0);

const result2 = input
  .split(newLine)
  .map((row) => row.split(' '))
  .map(([c1, c2]) => [rpsScore[c1], rScore[c2]])
  .reduce((acc, [o, m]) => acc + getScore2(o, m), 0);

console.log(result1);
console.log(result2);
