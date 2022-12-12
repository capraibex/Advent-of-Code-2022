const newLine = '\r\n';
const input = await Deno.readTextFile('./input.txt');

type HeightMapInfos = { heightMap: Coordinate[][]; start: Coordinate; end: Coordinate };

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

class Coordinate {
  x: number;
  y: number;
  height: number;
  weight = -1;

  constructor(x: number, y: number, height: number) {
    this.x = x;
    this.y = y;
    this.height = height;
  }

  setWeight(weight: number) {
    this.weight = weight;
  }
}

function getHeightMapInfos(): HeightMapInfos {
  let start: Coordinate;
  let end: Coordinate;
  const heightMap = input.split(newLine).map((row, y) =>
    [...row].map((c, x) => {
      if (c === 'S') {
        start = new Coordinate(x, y, 0);
        return start;
      }
      if (c === 'E') {
        end = new Coordinate(x, y, 25);
        return end;
      }
      return new Coordinate(x, y, c.charCodeAt(0) - 97);
    })
  );
  return { start: start!, end: end!, heightMap };
}

function getDistance({ start, end, heightMap }: HeightMapInfos): number | null {
  start.setWeight(0);
  const candidates = [start];

  while (end!.weight === -1) {
    const coord = candidates.sort((a, b) => b.weight - a.weight).pop() as Coordinate;
    if (!coord) {
      return null;
    }

    directions
      .map((dir) => heightMap[coord.y + dir[1]]?.[coord.x + dir[0]])
      .filter((n) => n && n.height - coord.height <= 1 && (n.weight === -1 || n.weight > coord.weight + 1))
      .forEach((n) => {
        n.setWeight(coord.weight + 1);
        candidates.push(n);
      });
  }

  return end.weight;
}

let heightMapInfos = getHeightMapInfos();
const result1 = getDistance(heightMapInfos);

heightMapInfos = getHeightMapInfos();
const result2 = heightMapInfos.heightMap
  .flat()
  .filter((c) => c.height === 0)
  .map((c) => getDistance({ ...getHeightMapInfos(), start: c }))
  .filter((d) => d != null)
  .sort((a, b) => a! - b!)[0];

console.log(result1);
console.log(result2);
