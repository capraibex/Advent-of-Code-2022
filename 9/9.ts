const newLine = '\r\n';
const input = await Deno.readTextFile('./input.txt');

class Coordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(coord: Coordinate): Coordinate {
    this.x += coord.x;
    this.y += coord.y;
    return this;
  }

  subtract(coord: Coordinate): Coordinate {
    this.x -= coord.x;
    this.y -= coord.y;
    return this;
  }

  copy(): Coordinate {
    return new Coordinate(this.x, this.y);
  }

  toString(): string {
    return [this.x, this.y].join();
  }
}

function solve(part: number) {
  const ropeLength = part === 1 ? 2 : 10;
  const rope: Coordinate[] = [...new Array(ropeLength)].map(() => new Coordinate(0, 0));
  const coords: Set<string> = new Set([rope[0].toString()]);
  const directions: { [key: string]: Coordinate } = {
    U: new Coordinate(0, 1),
    R: new Coordinate(1, 0),
    D: new Coordinate(0, -1),
    L: new Coordinate(-1, 0),
  };

  input
    .split(newLine)
    .map((row) => row.split(' '))
    .forEach(([direction, n]) => {
      [...new Array(Number(n))].forEach(() => {
        rope[0].add(directions[direction]);

        for (let i = 0; i < rope.length - 1; i++) {
          const { x: dx, y: dy } = rope[i].copy().subtract(rope[i + 1]);

          if (Math.hypot(dx, dy) >= 2) {
            const dCoord = new Coordinate(...([dx, dy].map(Math.sign) as [number, number]));
            rope[i + 1].add(dCoord);
            coords.add(rope[rope.length - 1].toString());
          }
        }
      });
    });

  console.log(coords.size);
}

solve(1);
solve(2);
