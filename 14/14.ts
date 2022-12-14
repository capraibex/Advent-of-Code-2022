const newLine = '\r\n';
const input = await Deno.readTextFile('./input.txt');

const coords = input.split(newLine).map((row) => row.split(' -> ').map((c) => c.split(',').map(Number)));

const yMax = Math.max(...coords.flat().map((c) => c[1])) + 1;
const sandStart = [500, 0];
const rocks = new Set();

coords.forEach((rockPathCoords) => {
  for (let i = 0; i < rockPathCoords.length - 1; i++) {
    const [cX, cY] = rockPathCoords[i];
    const [nX, nY] = rockPathCoords[i + 1];
    let x = cX;
    let y = cY;
    rocks.add([cX, cY].join());
    rocks.add([nX, nY].join());

    do {
      x += Math.sign(nX - cX);
      y += Math.sign(nY - cY);
      rocks.add([x, y].join());
    } while (x !== nX || y !== nY);
  }
});

function solve(part: number): number {
  const sandUnits = new Set();

  while (true) {
    let [x, y] = [...sandStart];
    while (part === 2 || y < yMax) {
      const down = [x, y + 1].join();
      const left = [x - 1, y + 1].join();
      const right = [x + 1, y + 1].join();

      if (!rocks.has(down) && !sandUnits.has(down) && y < yMax) {
        y++;
      } else if (!rocks.has(left) && !sandUnits.has(left) && y < yMax) {
        x--;
        y++;
      } else if (!rocks.has(right) && !sandUnits.has(right) && y < yMax) {
        x++;
        y++;
      } else {
        sandUnits.add([x, y].join());
        break;
      }
    }

    if ((part === 1 && y >= yMax) || (part === 2 && [x, y].join() === sandStart.join())) {
      break;
    }
  }

  return sandUnits.size;
}

const result1 = solve(1);
const result2 = solve(2);

console.log(result1);
console.log(result2);
