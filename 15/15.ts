const newLine = '\r\n';
const input = await Deno.readTextFile('./input.txt');

interface SensorBeaconPair {
  sX: number;
  sY: number;
  bX: number;
  bY: number;
  d: number;
}

function getManhattanDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

const sensorBeaconPairs: SensorBeaconPair[] = input
  .split(newLine)
  .map((row) => row.match(/\-?\d+/g)!.map(Number))
  .map(([sX, sY, bX, bY]) => ({ sX, sY, bX, bY, d: getManhattanDistance(sX, sY, bX, bY) }));

const [minX, maxX] = [
  Math.min(...sensorBeaconPairs.map(({ sX, bX, d }) => [sX - d, bX]).flat()),
  Math.max(...sensorBeaconPairs.map(({ sX, bX, d }) => [sX + d, bX]).flat()),
];

const result1 = [...new Array(Math.abs(maxX - minX))]
  .map((_, i) => i + minX)
  .filter((x) =>
    sensorBeaconPairs.some(({ sX, sY, bX, bY, d }) => !(x === bX && 2000000 === bY) && getManhattanDistance(x, 2000000, sX, sY) <= d)
  ).length;

console.log(result1);

let x = 0;
let y = 0;
let pair = sensorBeaconPairs.find(({ sX, sY, d }) => getManhattanDistance(x, y, sX, sY) <= d);
const max = 4000000;

while (pair) {
  const nx = x + pair.d - getManhattanDistance(x, y, pair.sX, pair.sY) + 1;

  x = nx > max ? 0 : nx;
  y = nx > max ? y + 1 : y;

  pair = sensorBeaconPairs.find(({ sX, sY, d }) => getManhattanDistance(x, y, sX, sY) <= d);
}

const result2 = x * max + y;

console.log(result2);
