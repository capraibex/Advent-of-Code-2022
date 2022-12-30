const input = await Deno.readTextFile('./input.txt');

interface Coordinate {
  x: number;
  y: number;
}

interface CycleInfo {
  piecesTillNow: number;
  height: number;
}

const flow = [...input].map((c) => (c === '<' ? -1 : 1));

const rocks: Coordinate[][] = [
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ],
  [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 2 },
  ],
  [
    { x: 2, y: 2 },
    { x: 2, y: 1 },
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ],
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
];

const chamberWidth = 7;
const rockWidths = [4, 3, 3, 1, 2];
const rockHeights = [1, 3, 3, 4, 2];

function canMove(pos: Coordinate, rockType: number, chamber: Set<string>): boolean {
  if (pos.x < 0 || pos.x + rockWidths[rockType] > chamberWidth || pos.y < 0) {
    return false;
  }
  return rocks[rockType].every((r) => !chamber.has([pos.x + r.x, pos.y + r.y].join()));
}

function solve(maxPieces: number): number {
  const chamber = new Set<string>();
  const cycleDict = new Map<string, CycleInfo>();
  let pieces = 0;
  let flowIdx = 0;
  let currentHeight = 0;
  let additionalHeight = 0;

  while (pieces < maxPieces) {
    const rockType = pieces % rocks.length;
    const currentRockPosition: Coordinate = { x: 2, y: 3 + currentHeight };

    while (true) {
      const x = flow[flowIdx++ % flow.length];

      if (canMove({ ...currentRockPosition, x: currentRockPosition.x + x }, rockType, chamber)) {
        currentRockPosition.x += x;
      }

      if (canMove({ ...currentRockPosition, y: currentRockPosition.y - 1 }, rockType, chamber)) {
        currentRockPosition.y -= 1;
      } else {
        break;
      }
    }

    currentHeight = Math.max(currentHeight, rockHeights[rockType] + currentRockPosition.y);
    rocks[rockType].forEach((r) => chamber.add([r.x + currentRockPosition.x, r.y + currentRockPosition.y].join()));

    const uniqueKeyOfLast20Rows = [...new Array(20)]
      .map((_, y) => [...new Array(chamberWidth)].map((_, x) => chamber.has([x, currentHeight - y].join())))
      .join();
    const key = [flowIdx % flow.length, rockType, uniqueKeyOfLast20Rows].join();

    if (cycleDict.has(key)) {
      const cycleInfo = cycleDict.get(key)!;
      const pieceDiff = pieces - cycleInfo.piecesTillNow;
      const cycles = Math.floor((maxPieces - cycleInfo.piecesTillNow) / pieceDiff) - 1;

      additionalHeight += cycles * (currentHeight - cycleInfo.height);
      pieces += cycles * pieceDiff;
    } else {
      cycleDict.set(key, { height: currentHeight, piecesTillNow: pieces });
    }

    pieces++;
  }

  return currentHeight + additionalHeight;
}

const result1 = solve(2022);
const result2 = solve(1_000_000_000_000);

console.log(result1);
console.log(result2);
