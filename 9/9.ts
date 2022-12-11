const newLine = '\r\n';
const input = await Deno.readTextFile('./input.txt');

type coord = [number, number];

function solve(part: number) {
  const ropeLength = part === 1 ? 2 : 10;
  const rope: coord[] = [...new Array(ropeLength)].map((_) => [0, 0]);
  const coords: Set<string> = new Set([[0, 0].join()]);
  const directions: { [key: string]: coord } = {
    U: [1, 1],
    R: [1, 0],
    D: [-1, 1],
    L: [-1, 0],
  };

  input
    .split(newLine)
    .map((row) => row.split(' '))
    .forEach(([direction, n]) => {
      [...new Array(+n)].forEach(() => {
        rope[0][directions[direction][1]] += directions[direction][0];

        for (let j = 0; j < rope.length - 1; j++) {
          const coordsDiff = rope[j].map((c, i) => c - rope[j + 1][i]);

          if (coordsDiff.some((c) => Math.abs(c) >= 2)) {
            const diffDir = coordsDiff.map((c) => Math.sign(c));
            rope[j + 1] = rope[j + 1].map((c, i) => c + diffDir[i]) as coord;
            coords.add(rope[rope.length - 1].join());
          }
        }
      });
    });

  console.log(coords.size);
}

solve(1);
solve(2);
